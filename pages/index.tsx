import { GetStaticProps, GetStaticPropsResult } from "next";
import { useState } from "react";
import axios from "axios";
import { Htag } from "../components";
import { Button } from "../components";
import { P } from "../components";
import { Tag } from "../components";
import { Rating } from "../components";
import { WithLayout } from "../layout/Layout";
import { MenuItem } from "../intarfaces/menu.interface";

const Home = ({ menu, firstCategory }: HomeProps): JSX.Element => {
    const [rating, setRating] = useState<number>(4);

    return (
        <>
            <Htag tag="h1">Текст</Htag>
            <Htag tag="h2">Текст</Htag>
            <Htag tag="h3">Текст</Htag>

            <Button appearance="primary">Кнопка</Button>
            <Button appearance="ghost">Кнопка</Button>

            <Button appearance="primary" arrow="right">
                Кнопка
            </Button>
            <Button arrow="down" appearance="ghost">
                Кнопка
            </Button>

            <P size="l">Большой</P>
            <P>Средний</P>
            <P size="s">Маленький</P>

            <Tag color="red" size="s">
                Красный
            </Tag>
            <Tag color="green" size="s">
                Зеленый
            </Tag>
            <Tag color="ghost" size="s">
                Призрак
            </Tag>
            <Tag color="gray" size="s">
                Серый
            </Tag>
            <Tag color="primary" size="s">
                Фиолетовый
            </Tag>

            <Tag color="red" size="m">
                Красный
            </Tag>
            <Tag color="green" size="m">
                Зеленый
            </Tag>
            <Tag color="ghost" size="m">
                Призрак
            </Tag>
            <Tag color="gray" size="m">
                Серый
            </Tag>
            <Tag color="primary" size="m">
                Фиолетовый
            </Tag>
            <Tag color="red">Красный</Tag>
            <Tag color="green">Зеленый</Tag>
            <Tag color="ghost">Призрак</Tag>
            <Tag color="gray">Серый</Tag>
            <Tag color="primary">Фиолетовый</Tag>

            <Rating rating={4} />
            <Rating rating={rating} isEditable setRating={setRating} />
        </>
    );
};

export default WithLayout(Home);

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
