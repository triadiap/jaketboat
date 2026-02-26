import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { ViewTicketComponent } from './view_ticket_component';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pesanan Saya',
        href: dashboard().url,
    },
];

type Detail = {
    tanggal: string;
    jam_berangkat: string;
    jam_sampai: string;
    name: string;
    from: string;
    to: string;
}

type Passenger = {
    name: string;
    booking_code: string;
    code: string;
}

interface Props {
    detail: Detail;
    ListPassanger: Passenger[];
}

function imgToDataUrl(img: HTMLImageElement): string {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
}

async function inlineExternalImages(container: HTMLElement) {
    const images = container.querySelectorAll<HTMLImageElement>('img');
    await Promise.all(
        Array.from(images).map(async (img) => {
            if (!img.src || img.src.startsWith('data:')) return;

            // Try CORS fetch first
            try {
                const res = await fetch(img.src, { mode: 'cors', cache: 'no-cache' });
                const blob = await res.blob();
                const dataUrl = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(blob);
                });
                img.src = dataUrl;
                return;
            } catch {
                // CORS blocked, try canvas fallback
            }

            // Fallback: re-load image with crossOrigin and draw to canvas
            try {
                const proxyImg = new Image();
                proxyImg.crossOrigin = 'anonymous';
                await new Promise<void>((resolve, reject) => {
                    proxyImg.onload = () => resolve();
                    proxyImg.onerror = () => reject();
                    proxyImg.src = img.src + (img.src.includes('?') ? '&' : '?') + '_t=' + Date.now();
                });
                img.src = imgToDataUrl(proxyImg);
                return;
            } catch {
                // Still blocked
            }

            // Last resort: draw the already-rendered image via canvas (works if same-origin or CORS allowed previously)
            try {
                img.src = imgToDataUrl(img);
            } catch {
                // Tainted canvas — replace with a transparent placeholder
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            }
        }),
    );
}

export default function view_ticket({ detail, ListPassanger }: Props) {
    const [loading, setLoading] = useState(false);

    async function handleDownloadPDF() {
        setLoading(true);
        try {
            const [{ toPng }, { default: jsPDF }] = await Promise.all([
                import('html-to-image'),
                import('jspdf'),
            ]);

            // Pre-convert cross-origin images to data URLs so SVG foreignObject can use them
            const ticketContainer = document.querySelector<HTMLElement>('#ticket-print-area');
            if (!ticketContainer) return;
            await inlineExternalImages(ticketContainer);

            const tickets = document.querySelectorAll<HTMLElement>('.ticket-card');
            if (!tickets.length) return;

            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const pageWidth = pdf.internal.pageSize.getWidth();
            const margin = 10;
            const imgWidth = pageWidth/2 - margin * 2;

            for (let i = 0; i < tickets.length; i++) {
                const dataUrl = await toPng(tickets[i], {
                    quality: 1,
                    pixelRatio: 2,
                    skipFonts: true,
                });

                const img = new Image();
                await new Promise<void>((resolve, reject) => {
                    img.onload = () => resolve();
                    img.onerror = reject;
                    img.src = dataUrl;
                });

                const imgHeight = (img.height * imgWidth) / img.width;
                if (i > 0) pdf.addPage();
                pdf.addImage(dataUrl, 'PNG', margin, 10, imgWidth, imgHeight);
            }

            pdf.save('ticket.pdf');
        } catch (err) {
            console.error('PDF generation failed:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tiket Saya" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div id="ticket-print-area" className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {ListPassanger.map((item) => (
                        <ViewTicketComponent key={item.booking_code} detail={detail} item={item} />
                    ))}
                </div>
                <Button onClick={handleDownloadPDF} disabled={loading}>
                    {loading ? 'Membuat PDF...' : 'Download PDF'}
                </Button>
            </div>
        </AppLayout>
    );
}
