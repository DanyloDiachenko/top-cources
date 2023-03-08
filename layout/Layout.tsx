import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Sidebar } from "./Sidebar/Sidebar";
import { LayoutProps } from "./Layout.props";
import styles from "./layoutProps.module.css";
import { FunctionComponent, ReactNode } from "react";

const Layout = ({ children, ...props }: LayoutProps): JSX.Element => {
    return (
        <>
            <Header />
            <div>
                <Sidebar />
                <div>{children}</div>
            </div>
            <Footer />
        </>
    );
};

export const WithLayout = <T extends Record<string, unknown>>(
    Component: FunctionComponent<T>
) => {
    return function WithLayoutComponent(props: T): JSX.Element {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    };
};
