import { Form, Head, Link, usePage  } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type {MasterDestination,MasterTiket, BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import Heading from '@/components/heading';
import { CalendarDays, Clock, Ship, MapPin, CheckCircle2, XCircle, QrCode, ScanLine, User2, ShipIcon, User2Icon, PinIcon, PointerIcon, Container } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import HomeController from '@/actions/App/Http/Controllers/HomeController';
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
import AppLogoIcon from '@/components/app-logo-icon';
import React,{ useRef } from 'react';
import generatePDF, { usePDF,Margin } from 'react-to-pdf';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pesanan Saya',
        href: dashboard().url,
    },
];

type Detail = {
    tanggal:string;
    jam_berangkat:string;
    jam_sampai:string;
    name:string;
    from:string;
    to:string;
}
type Passenger = {
    name:string;
    booking_code:string;
    code:string;
}

interface Props{
    detail:Detail;
    item:Passenger;
}


export const ViewTicketComponent =({detail,item}:Props)=>{
    const formatDate = (value: string) =>
        new Date(value).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <>
        <div className="ticket-card px-4 py-4 text-gray-800">
            <div className="flex flex-col bg-white border rounded-md shadow-md">
                <div className="py-2 px-4 flex text-sm bg-white items-center gap-4">
                    <div className='flex-none h-12 w-12'>                                
                        <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                    </div>
                    <div className="flex-1 font-bold text-lg items-center">
                    DISHUB DKI Jakarta
                    </div>
                </div>                            
                <div className="py-2 px-4 flex flex-col text-sm bg-gray-100 ">
                    <p className="self-start font-bold text-blue-900 text-xl">{detail.jam_berangkat}</p>
                    <p className="font-bold text-gray-800">{detail.from}</p>
                    <p className="text-center text-gray-800">2 Jam, {formatDate(detail.tanggal)}</p>          
                    <p className="self-start font-bold text-blue-900 text-xl">{detail.jam_sampai}</p>
                    <p className="font-bold text-gray-800">{detail.to}</p>                  
                </div>
                <hr className="border-dashed border-1 border-gray-400"/>
                <div className="py-2 px-4 flex flex-col text-sm bg-white ">
                    <p className="self-start font-bold text-blue-900 text-lg">KAPAL : <span className='text-gray-800'>{detail.name}</span></p>               
                </div>                            
                <hr className="border-dashed border-1 border-gray-400"/>
                <div className="py-2 px-4 flex flex-col text-sm bg-white ">
                    <div className="flex text-sm justify-between my-2">
                        <p className=" text-gray-500">PENUMPANG</p>  
                        <p className="text-gray-500">NOMOR TIKET</p>  
                    </div>             
                    <div className="flex text-sm justify-between my-2">
                        <p className="font-bold text-gray-800">{item.name}</p>  
                        <p className="font-bold text-gray-800">{item.booking_code}</p>  
                    </div>             
                </div>
                <div className="py-2 px-4 flex flex-col text-sm bg-white ">
                    <div className="flex text-sm justify-between my-2">
                        <p className=" text-gray-500">TYPE ID</p>  
                        <p className="text-gray-500">NO. ID</p>  
                    </div>             
                    <div className="flex text-sm justify-between my-2">
                        <p className="font-bold text-gray-800">KTP</p>  
                        <p className="font-bold text-gray-800">****************</p>  
                    </div>             
                </div>
                <hr className="border-dashed border-2 border-gray-400"/>
                <div className="py-2 px-4 flex-col flex text-center bg-gray-100">
                    <img className="mx-auto"
                        src={"https://adminjaketboat.icsp.co.id/ticket/qr/"+item.booking_code}
                        />
                        <p className="font-bold text-lg">Scan here to check in!</p>
                </div>
                <div className="py-2 px-4 flex flex-col text-sm ">
                    <p className="self-start font-bold text-gray-500">Dokumen ini sah sebagai tiket. Simpan dengan aman</p>
                </div>
            </div>
            </div>            
        </>
    );
}
