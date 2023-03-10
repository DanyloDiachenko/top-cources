import {
    GetStaticPaths,
    GetStaticPathsContext,
    GetStaticProps,
    GetStaticPropsContext,
} from "next";
import axios from "axios";
import { WithLayout } from "../../layout/Layout";
import { MenuItem } from "../../intarfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import { ParsedUrlQuery } from "querystring";

const Type = ({ firstCategory }: TypeProps): JSX.Element => {
    return <>Type {firstCategory}</>;
};

export default WithLayout(Type);

interface TypeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}

export const getStaticProps: GetStaticProps<TypeProps> = async ({
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
    const { data: menu } = await axios.post<MenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
        {
            firstCategory: firstCategoryItem.id,
        }
    );
    return {
        props: {
            menu,
            firstCategory: firstCategoryItem.id,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map((m) => "/" + m.route),
        fallback: true,
    };
};
