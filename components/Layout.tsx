import { FC, PropsWithChildren } from "react";
import Navbar from "./Navbar";

const Layout: FC<PropsWithChildren<any>> = function ({ children }) {
    return (
        <>
            <Navbar />
            <main
                className="flex min-h-screen flex-col py-24 px-5 md:px-[20%]"
            >
                {children}
            </main>
        </>
    )
}

export default Layout;