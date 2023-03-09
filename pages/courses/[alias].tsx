import {
    GetStaticPaths,
    GetStaticPathsContext,
    GetStaticProps,
    GetStaticPropsContext,
} from "next";
import { useState } from "react";
import axios from "axios";
import { WithLayout } from "../../layout/Layout";
import { MenuItem } from "../../intarfaces/menu.interface";
import { TopPageModel } from "../../intarfaces/page.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../intarfaces/product.interface";

const firstCategory: number = 0;

const Course = ({ menu, page, products }: CourseProps): JSX.Element => {
    const [rating, setRating] = useState<number>(4);

    return <>{products && products.length}</>;
};

export default WithLayout(Course);

interface CourseProps extends Record<string, unknown> {
    menu: MenuItem[];
    products: ProductModel[];
    page: TopPageModel;
    firstCategory: number;
}

export const getStaticProps: GetStaticProps<CourseProps> = async ({
    params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true,
        };
    }
    const firstCategory: number = 0;
    const { data: menu } = await axios.post<MenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
        {
            firstCategory,
        }
    );
    const { data: page } = await axios.get<TopPageModel>(
        process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/" + params.alias
    );
    const { data: products } = await axios.post<ProductModel[]>(
        process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find",
        {
            category: page.category,
            limit: 10,
        }
    );
    return {
        props: {
            menu,
            firstCategory,
            page,
            products,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: menu } = await axios.post<MenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
        {
            firstCategory,
        }
    );
    return {
        paths: menu.flatMap((m) => m.pages.map((p) => "/courses/" + p.alias)),
        fallback: true,
    };
};
