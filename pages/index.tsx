import { Htag } from "../components";
import { Button } from "../components";

export default function Home(): JSX.Element {
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
        </>
    );
}
