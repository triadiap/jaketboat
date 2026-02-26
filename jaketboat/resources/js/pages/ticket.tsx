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
                variant='small'
                title='Daftar Pesanan'
                description='Data pesanan tiket'
            ></Heading>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {ListTicket.map((item) => (
                    <div className="relative overflow-hidden">
                        <Card>
                            <CardContent className="pl-4 pr-4">
                                <div className='flex'>
                                    <div className='flex-1'>
                                                                        <div className="flex items-center gap-2 ">
                                    <Ship className="h-4 w-4 shrink-0" />
                                    <span>{item.name.toUpperCase()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 shrink-0" />
                                <span>{formatDate(item.tanggal)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 shrink-0" />
                                    <span>{item.jam_berangkat}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User2 className="h-4 w-4 shrink-0" />
                                    <span>{item.total_passenger}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 shrink-0" />
                                    <span>{(item.status=="paid")?"TIket sudah tersedia":"Menunggu tiket tergenerate"}</span>
                                </div>

                                    </div>
                                <div className='flex-none w-[150px] text-justify text-xs'>Pastikan anda hadir 1 jam sebelum keberangkatan. Dengan membawah tiket dan KTP yang sesuai</div>
 
                                </div>
                                <a href={view_ticket.url(item.id)}>
                                {(item.status=="paid") && <Button variant="outline" className="w-full mt-5">
                                    Lihat Detail
                                </Button>}
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
