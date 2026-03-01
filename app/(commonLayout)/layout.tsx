import React from 'react';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="h-full ">
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
        </main>
    );
}