import { GetStaticProps } from "next";
import axios from "axios";

import { API } from "../helpers/api";
import { WithLayout } from "../layout/Layout";
import { MenuItem } from "../interfaces/menu.interface";

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
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory,
    });
    return {
        props: {
            menu,
            firstCategory,
        },
    };
};
