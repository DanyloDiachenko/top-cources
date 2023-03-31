import { Htag, Tag, HhData, Advantages } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from "./TopPageComponent.module.css";
import { TopLevelCategory } from "../../interfaces/page.interface";

export const TopPageComponent = ({
    page,
    products,
    firstCategory,
}: TopPageComponentProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                {page && page.title ? <Htag tag="h1">{page.title}</Htag> : ""}

                {products && (
                    <Tag color="gray" size="m">
                        {products.length}
                    </Tag>
                )}
                <span>Сортировка</span>
            </div>
            <div>
                {products &&
                    products.map((product) => (
                        <div key={product._id}>{product.title}</div>
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
