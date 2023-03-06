import cn from "classnames";
import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";

export const Button = ({ appearance, children }: ButtonProps): JSX.Element => {
    return (
        <button
            className={cn(styles.button, {
                [styles.primary]: appearance == "primary",
                [styles.ghost]: appearance == "ghost",
            })}
        >
            {children}
        </button>
    );
};
