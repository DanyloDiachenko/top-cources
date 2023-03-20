import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useState } from "react";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { WithLayout } from "../../layout/Layout";
import { TopPageComponent } from "../../page-components";
import { MenuItem } from "../../intarfaces/menu.interface";
import {
    TopLevelCategory,
    TopPageModel,
} from "../../intarfaces/page.interface";
import { ProductModel } from "../../intarfaces/product.interface";
import { firstLevelMenu } from "../../helpers/helpers";

const TopPage = ({
    firstCategory,
    page,
    products,
}: TopPageProps): JSX.Element => {
    const [rating, setRating] = useState<number>(4);

    return (
        <TopPageComponent
            firstCategory={firstCategory}
            page={page}
            products={products}
        />
    );
};

export default WithLayout(TopPage);

interface TopPageProps extends Record<string, unknown> {
    menu: MenuItem[];
    products: ProductModel[];
    page: TopPageModel;
    firstCategory: TopLevelCategory;
}

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
    params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true,
        };
    }
    const firstCategoryItem = firstLevelMenu.find(
        (m) => m.route === params.type
    );
    if (!firstCategoryItem) {
        return {
            notFound: true,
        };
    }
    const firstCategory: number = firstCategoryItem.id;

    try {
        const { data: menu } = await axios.post<MenuItem[]>(
            process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
            {
                firstCategory,
            }
        );
        if (menu.length === 0) {
            return {
                notFound: true,
            };
        }
        const { data: page } = await axios.get<TopPageModel>(
            process.env.NEXT_PUBLIC_DOMAIN +
                "/api/top-page/byAlias/" +
                params.alias
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
    } catch (e) {
        return {
            notFound: true,
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for (const m of firstLevelMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(
            process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
            {
                firstCategory: m.id,
            }
        );
        paths = paths.concat(
            menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`))
        );
    }
    return {
        paths: paths,
        fallback: true,
    };
};
