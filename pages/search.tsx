import { GetStaticProps } from "next";
import axios from "axios";
import { WithLayout } from "../layout/Layout";
import { MenuItem } from "../intarfaces/menu.interface";

const Search = (): JSX.Element => {
    return <>Search</>;
};

export default WithLayout(Search);

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory: number = 0;
    const { data: menu } = await axios.post<MenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
        {
            firstCategory,
        }
    );
    return {
        props: {
            menu,
            firstCategory,
        },
    };
};
