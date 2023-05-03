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
                <main className="mx-auto max-w-7xl px-8">{children}</main>
            <Footer/>
        </>
    )
} 