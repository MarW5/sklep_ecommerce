import { ReactNode } from 'react';

interface MainProps {
    children: ReactNode;
}

export const Main = ({ children }: MainProps) => (
    <main className="max-h-full flex justify-center flex-col">
        {children}
    </main>
)