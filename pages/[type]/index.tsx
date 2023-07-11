import { useRouter } from "next/router";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { firstLevelMenu } from "../../helpers/helpers";
import { MenuItem } from "../../interfaces/menu.interface";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { API } from "../../helpers/api";
import Link from "next/link";
import Htag from "../../components/Htag/Htag";
import { withLayout } from '../../layout/Layout';

const Type = ({ firstCategory, menu }: TypeProps): JSX.Element => {
    const categories = ["Курсы", "Сервисы", "Книги", "Продукты"];

    const router = useRouter();

    return (
        <>
            <Htag tag="h1">Категория: {categories[firstCategory]}</Htag>
            {menu && menu.length && menu.map((menuItem, index) => (
                <div key={index}>
                    {menuItem && menuItem.pages.length && menuItem.pages.map((page) => (
                        <Htag tag="h4">
                            <Link
                                href={router.asPath + "/" + page.alias}
                                key={page._id}
                            >
                                {page.title}
                            </Link>
                        </Htag>
                    ))}
                </div>
            ))}
        </>
    );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map((m) => "/" + m.route),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({
    params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params)
        return {
            notFound: true,
        };
    const firstCategoryItem = firstLevelMenu.find(
        (m) => m.route === params.type
    );
    if (!firstCategoryItem) {
        return {
            notFound: true,
        };
    }
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory: firstCategoryItem.id,
    });
    return {
        props: {
            menu,
            firstCategory: firstCategoryItem.id,
        },
    };
};

interface TypeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
}
