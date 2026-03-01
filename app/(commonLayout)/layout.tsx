import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="h-full ">
             <Navbar/>
            {children}
            <Footer/>
        </main>
    );
}