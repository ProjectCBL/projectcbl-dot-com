import {ReactNode} from "react";

interface Props {
    children?: ReactNode;
    roundedCorners?: string;
    bgColor?: string;
    height: string;
    width: string;
    additionalStyles?: string[];
}

function Panel({children, width, height, roundedCorners, additionalStyles, bgColor}: Props) {
    const style: string = `${bgColor ?? "bg-white"} ${width} ${height} ${roundedCorners ?? "rounded-xl"} ${additionalStyles?.join(" ") ?? ""}`;
    return <div className={style}>
        {children}
    </div>
}

export default Panel;