import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useContext } from "react";
import cn from "classnames";
import { AppContext } from "../../context/app.context";
import styles from "./Menu.module.css";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);

    const router: NextRouter = useRouter();

    const openSecondLevel = (secondCategory: string) => {
        setMenu &&
            setMenu(
                menu.map((m) => {
                    if (m._id.secondCategory == secondCategory) {
                        m.isOpened = !m.isOpened;
                    }
                    return m;
                })
            );
    };

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
                {menu.map((m) => {
                    if (
                        m.pages
                            .map((p) => p.alias)
                            .includes(router.asPath.split("/")[2])
                    ) {
                        m.isOpened = true;
                    }
                    return (
                        <div key={m._id.secondCategory}>
                            <div
                                className={styles.secondLevel}
                                onClick={(): void =>
                                    openSecondLevel(m._id.secondCategory)
                                }
                            >
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
                    );
                })}
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
                                [styles.thirdLevelActive]:
                                    `/${route}/${p.alias}` === router.asPath,
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
