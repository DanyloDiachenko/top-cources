import { useReducer, useEffect } from "react";

import { sortReducer } from "./sort.reducer";
import { Htag, Tag, HhData, Advantages, Sort } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from "./TopPageComponent.module.css";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { SortEnum } from "../../components/Sort/Sort.props";
import { Product } from "../../components";

export const TopPageComponent = ({
    page,
    products,
    firstCategory,
}: TopPageComponentProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
        sortReducer,
        { products, sort: SortEnum.Rating }
    );

    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort });
    };

    useEffect(() => {
        dispatchSort({ type: "reset", initialState: products });
    }, [products]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                {page && page.title ? <Htag tag="h1">{page.title}</Htag> : ""}

                {products && (
                    <Tag className={styles.tag} color="gray" size="m">
                        {products.length}
                    </Tag>
                )}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div>
                {products &&
                    products.map((product) => (
                        <Product layout key={product._id} product={product} />
                    ))}
            </div>
            <div className={styles.hhTitle}>
                {page && page.category !== undefined ? (
                    <Htag tag="h2">Вакансии - {page.category}</Htag>
                ) : (
                    ""
                )}

                <Tag color="red" size="m">
                    hh.ru
                </Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && (
                <HhData {...page.hh} />
            )}
            {page &&
                page.advantages !== undefined &&
                page.advantages.length > 0 && (
                    <>
                        <Htag tag="h2">Преимущства</Htag>
                        <Advantages advantages={page.advantages} />
                    </>
                )}
            {page && page.seoText !== undefined && (
                <div
                    className={styles.seo}
                    dangerouslySetInnerHTML={{ __html: page.seoText }}
                />
            )}
            <Htag tag="h2">Получаемые навыки</Htag>
            {page &&
                page.tags !== undefined &&
                page.tags.map((t) => (
                    <Tag key={t} color="primary">
                        {t}
                    </Tag>
                ))}
        </div>
    );
};
