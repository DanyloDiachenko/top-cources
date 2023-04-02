import { useState, useEffect, KeyboardEvent } from "react";
import cn from "classnames";
import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import StarIcon from "./star.svg";

export const Rating = ({
    isEditable = false,
    rating,
    setRating,
    ...props
}: RatingProps): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
        new Array(5).fill(<></>)
    );
    const StarIconTs: React.FunctionComponent<
        React.SVGAttributes<SVGAElement>
    > = StarIcon;

    const changeDisplay = (i: number): void => {
        if (!isEditable) {
            return;
        }
        constuctRating(i);
    };

    const onClick = (i: number): void => {
        if (!isEditable || !setRating) {
            return;
        }
        setRating(i);
    };

    const constuctRating = (currentRating: number): void => {
        const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                <span
                    key={i}
                    className={cn(styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable,
                    })}
                    onMouseEnter={(): void => changeDisplay(i + 1)}
                    onMouseLeave={(): void => changeDisplay(rating)}
                    onClick={(): void => onClick(i + 1)}
                >
                    <StarIconTs
                        tabIndex={isEditable ? 0 : -1}
                    />
                </span>
            );
        });
        setRatingArray(updatedArray);
    };

    useEffect(() => {
        constuctRating(rating);
    }, [rating]);

    return (
        <div {...props}>
            {ratingArray.map((r: JSX.Element, i: number) => (
                <span key={i}>{r}</span>
            ))}
        </div>
    );
};
