import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto text-center">
                <div className="mb-4">
                <a href="#" className="mx-2 text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="mx-2 text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="mx-2 text-gray-400 hover:text-white">Instagram</a>
                </div>
                <p>© 2026 ICSP. All rights reserved.</p>
                </div>
            </footer>
        </AppShell>
    );
}
