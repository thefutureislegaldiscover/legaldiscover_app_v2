import { PropsWithChildren } from 'react';
import { Sidebar } from "./sidebar";
import { Header } from "./header";

type AppLayoutProps = PropsWithChildren<{}>;

export const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className="h-screen flex bg-gray-50">
            <Sidebar />
            <div className="flex flex-col h-full w-full overflow-hidden">
                <Header />
                <div className="flex-grow overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}
