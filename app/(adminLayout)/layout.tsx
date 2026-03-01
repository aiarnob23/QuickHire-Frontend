import Sidebar from '@/components/adminLayout/Sidebar';
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="h-full flex gap-4">
            <Sidebar/>
            {children}
        </main>
    );
}