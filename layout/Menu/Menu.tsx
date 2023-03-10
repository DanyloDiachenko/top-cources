import { useContext } from "react";
import { AppContext } from "../../context/app.context";

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);

    return (
        <div>
            {menu &&
                menu.map((m) => (
                    <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
                ))}
        </div>
    );
};
