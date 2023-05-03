import { Header } from './Header/Header';
import { Footer } from './Footer';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps)=>{
    return(
        <>
            <Header/>
                <main className="max-h-full flex justify-center flex-col">{children}</main>
            <Footer/>
        </>
    )
} 