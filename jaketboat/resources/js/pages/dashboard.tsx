import { Form, Head, Link, usePage  } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type {MasterDestination, BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import HomeController, { pesan } from '@/actions/App/Http/Controllers/HomeController';
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
        title: 'Penyebrangan',
        href: dashboard().url,
    },
];



export type PageData = {
    to: string;
    from: string;
    date: string;
    person: string;
}

export type PageResult = {
    id:number;
    time: string;
    ship: string;
    route:string;
    type:string;
    available:number;    
    price: string;
}
interface SeachProps{
    destination:MasterDestination[];
    formData:PageData;
    result:PageResult[];
}

export default function Dashboard({destination,formData,result}:SeachProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pesan Tiket" />
            <div className="lex h-full flex-1 flex-col overflow-x-auto">
                <div className="flex bg-linear-to-r from-cyan-500 to-blue-500 bg-[url(/images/JAKETBOAT.png)] bg-fit overflow-hidden rounded-sm border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="none md:flex-1"></div>
                    <div className="none md:flex-1"></div>
                    <div className = "bg-white flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 m-4 md:mr-10" >
                        <Heading
                            title='Pilih Rute'
                        ></Heading>
                        <Form 
                        {...HomeController.dashboard['/'].form}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6">
                            {({ processing, recentlySuccessful, errors }) => (
                                <>
                                <div className="grid gap-2">
                                    <Label htmlFor="pemberangkatan">From</Label>
                                    <Select name="from" defaultValue={formData.from}>
                                        <SelectTrigger className="mt-1 w-full">
                                            <SelectValue placeholder="From"  />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            {destination.map((item) => (
                                                <SelectItem  key={item.id} value={item.id+""}>{item.name}</SelectItem>
                                            ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError
                                        className="mt-2"
                                        message=""
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="pemberangkatan">To</Label>
                                    <Select name="to" defaultValue={formData.to}>
                                        <SelectTrigger className="mt-1 w-full">
                                            <SelectValue placeholder="To" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            {destination.map((item) => (
                                                <SelectItem key={item.id} value={item.id+""}>{item.name}</SelectItem>
                                            ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError
                                        className="mt-2"
                                        message=""
                                    />
                                    <InputError
                                        className="mt-2"
                                        message=""
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="tujuan">Date</Label>

                                    <Input
                                        id="date"
                                        className="mt-1 block w-full"
                                        name="date"
                                        type="date"
                                        required
                                        defaultValue={formData.date}
                                        autoComplete="tujuan"
                                        placeholder="Tanggal"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message=""
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="person">Jumlah Penumpang</Label>

                                    <Input
                                        id="person"
                                        className="mt-1 block w-full"
                                        name="person"
                                        type="number"
                                        required
                                        defaultValue={formData.person}
                                        autoComplete="tujuan"
                                        placeholder="Passenger"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message=""
                                    />
                                </div>
                                
                                <Button>
                                    Search
                                </Button>
                            </>
                            )}
                        </Form>
                    </div>
                </div>
                <div className="p-4 grid auto-rows-min gap-4 md:grid-cols-3">
                    {result.map((item) => (
                        <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            <Card className="rounded-xl">
                                <CardContent className="pl-4 pr-4">
                                   <div className='border-b border-sidebar-border/80 flex gap-2 items-center'>
                                        <div className='flex-none'>
                                            <span className='font-bold text-lg text-blue-500'>{item.time}</span>
                                        </div>
                                        <div className='flex-1'>
                                            <h2 className='font-bold'>{item.ship}</h2>
                                            <h1>{item.type}</h1>
                                            <h1>{item.available} Kuri Tersisa</h1>
                                        </div>
                                        <div className='flex-none h-full'>
                                            <h1>{item.price}</h1>
                                            <a href={pesan.url(item.id)}>
                                                <Button className='h-full'>Pilih</Button>
                                            </a>
                                        </div>
                                   </div>
                                   <div className='flex pt-2'>
                                        <span className='text-center font-bold text-xs text-blue-400'>{item.route}</span>
                                   </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
