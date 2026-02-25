import { Form, Head, Link, usePage  } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type {MasterDestination,MasterTiket, BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import Heading from '@/components/heading';
import { CalendarDays, Clock, Ship, MapPin, CheckCircle2, XCircle, QrCode, ScanLine, User2 } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import HomeController, { view_ticket } from '@/actions/App/Http/Controllers/HomeController';
import { Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
 } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pesanan Saya',
        href: dashboard().url,
    },
];



interface Props{
    ListTicket:MasterTiket[];
}

export default function Ticket({ListTicket}:Props) {
    const formatDate = (value: string) =>
        new Date(value).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tiket Saya" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Heading
                title='Tiket Saya'
                description='Daftar Tiket Saya'
            ></Heading>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {ListTicket.map((item) => (
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Card className="rounded-xl">
                            <CardContent className="pl-4 pr-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Ship className="h-4 w-4 shrink-0" />
                                    <span>{item.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                <CalendarDays className="h-4 w-4 shrink-0" />
                                <span>{formatDate(item.tanggal)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4 shrink-0" />
                                    <span>{item.jam_berangkat}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <User2 className="h-4 w-4 shrink-0" />
                                    <span>{item.total_passenger}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4 shrink-0" />
                                    <span>{item.status}</span>
                                </div>
                                <a href={view_ticket.url(item.id)}>
                                <Button variant="outline" className="w-full">
                                    Lihat Detail
                                </Button>
                                </a>
                            </CardContent>
                        </Card>
                    </div>
                ))}
                </div>
                </div>
        </AppLayout>
    );
}
