import {
    useState,
    useEffect,
    KeyboardEvent,
    forwardRef,
    ForwardedRef,
} from "react";
import cn from "classnames";
import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import StarIcon from "./star.svg";

export const Rating = forwardRef(
    (
        { isEditable = false, rating, error, setRating, ...props }: RatingProps,
        ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
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

        const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
            if (e.code != "Space" || !setRating) {
                return;
            }

            setRating(i);
        };

        const constuctRating = (currentRating: number): void => {
            const updatedArray = ratingArray.map(
                (r: JSX.Element, i: number) => {
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
                                onKeyDown={(e: KeyboardEvent<SVGElement>) =>
                                    isEditable && handleSpace(i + 1, e)
                                }
                            />
                        </span>
                    );
                }
            );
            setRatingArray(updatedArray);
        };

        useEffect(() => {
            constuctRating(rating);
        }, [rating]);

        return (
            <div
                {...props}
                ref={ref}
                className={cn(styles.ratingWrapper, {
                    [styles.error]: error,
                })}
            >
                {ratingArray.map((r, i) => (
                    <span key={i}>{r}</span>
                ))}
                {error && (
                    <span role="alert" className={styles.errorMessage}>
                        {error.message}
                    </span>
                )}
            </div>
        );
    }
);

Rating.displayName = "Rating";
