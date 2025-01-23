import { Button } from "antd";
import { FC } from "react";
import styles from "./Button.module.css";

export enum ButtonType {
    PRIMARY,
    SECONDARY,
    LINK,
    NORMAL,
    SUCCESS,
}

interface IButtonComponentProps {
    children: React.ReactNode;
    type?: ButtonType;
}

const ButtonComponent: FC<IButtonComponentProps> = (props: IButtonComponentProps) => {

    const {
        children,
        type = ButtonType.PRIMARY,
    } = props;

    return (
        <Button
            className={`${styles?.ButtonType?.[type].toLowerCase()}`}
        >
            {children}
        </Button>
    )
}

export default ButtonComponent;