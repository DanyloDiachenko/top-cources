import Link from "next/link";
import { useContext } from "react";
import cn from "classnames";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../intarfaces/menu.interface";
import styles from "./Menu.module.css";
import { TopLevelCategory } from "../../intarfaces/page.interface";
import CoursesIcon from "./icons/courses.svg";
import ServicesIcon from "./icons/services.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);

    const firstLevelMenu: FirstLevelMenuItem[] = [
        {
            route: "courses",
            name: "Курсы",
            icon: <CoursesIcon />,
            id: TopLevelCategory.Courses,
        },
        {
            route: "services",
            name: "Серсвисы",
            icon: <ServicesIcon />,
            id: TopLevelCategory.Services,
        },
        {
            route: "books",
            name: "Книги",
            icon: <BooksIcon />,
            id: TopLevelCategory.Books,
        },
        {
            route: "products",
            name: "Продукты",
            icon: <ProductsIcon />,
            id: TopLevelCategory.Products,
        },
    ];

    const buildFirstLevel = (): JSX.Element => {
        return (
            <>
                {firstLevelMenu.map((m) => (
                    <div key={m.id}>
                        <Link href={`/${m.route}`} legacyBehavior>
                            <a>
                                <div
                                    className={cn(styles.firstLevel, {
                                        [styles.firstLevelActive]:
                                            m.id === firstCategory,
                                    })}
                                >
                                    {m.icon}
                                    <span>{m.name}</span>
                                </div>
                            </a>
                        </Link>
                        {m.id === firstCategory && buildSecondLevel(m)}
                    </div>
                ))}
            </>
        );
    };
    const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
        return (
            <div className={styles.secondBlock}>
                {menu.map((m) => (
                    <div key={m._id.secondCategory}>
                        <div className={styles.secondLevel}>
                            {m._id.secondCategory}
                        </div>
                        <div
                            className={cn(styles.secondLevelBlock, {
                                [styles.secondLevelBlockOpened]: m.isOpened,
                            })}
                        >
                            {buildThirdLevel(m.pages, menuItem.route)}
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    const buildThirdLevel = (pages: PageItem[], route: string): JSX.Element => {
        return (
            <div>
                {pages.map((p) => (
                    <Link href={`/${route}/${p.alias}`} legacyBehavior>
                        <a
                            className={cn(styles.thirdLevel, {
                                [styles.thirdLevelActive]: false,
                            })}
                            key={p._id}
                        >
                            {p.category}
                        </a>
                    </Link>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.menu}>
            <ul>{menu && buildFirstLevel()}</ul>
        </div>
    );
};
