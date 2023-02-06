import {ReactNode} from "react";

interface Props{
    children?: ReactNode;
}

function Layout({children}: Props) {
    return (
        <div className="h-screen w-screen bg-[#1A1A1A] flex justify-center items-center">
            {children}
        </div>
    );
}

export default Layout;