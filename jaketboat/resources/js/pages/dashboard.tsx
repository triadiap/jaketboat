import { Form, Head, router,Link, usePage  } from '@inertiajs/react';
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
import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { BookMarked, CheckCircle2, CheckCircleIcon, RecycleIcon, RefreshCcw, ShipIcon, ToggleLeft, ToggleRight } from 'lucide-react';

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
    date2:string;
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
    defRoundTrip:boolean;
    result:PageResult[];
    result2:PageResult[];
}


export default function Dashboard({destination,formData,result,result2,defRoundTrip}:SeachProps) {
    
    const [scheduleB, setScheduleB] = useState(0); 
    const [scheduleP, setScheduleP] = useState(0); 
    const [roundTrip, setRoundTrip] = useState(defRoundTrip); 

    
    const [fromValue, setFromValue] = useState(formData.from);
    const [toValue, setToValue] = useState(formData.to);
    
    if(result2.length==0 && scheduleP==0){
        setScheduleP(-1);
    }
    console.log(defRoundTrip);
    
    function handleSubmit() {
        router.get(`/pesan_tiket/${scheduleB}/${scheduleP}`, formData);
    }
    const handleSwap = () => {
        setFromValue((prevFrom) => {
        setToValue(prevFrom); // set 'to' to old 'from'
            return toValue;       // set 'from' to old 'to'
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pesan Tiket" />
            <div className="lex h-full flex-1 flex-col overflow-x-auto">
                <div className="flex bg-linear-to-r from-cyan-500 to-blue-500 bg-[url(/images/JAKETBOAT.png)] bg-fit overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="none md:flex-1"></div>
                    <div className="none md:flex-1"></div>
                    <div className = "bg-background flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 m-4 md:mr-10" >
                        <p className='font-bold mb-10'                            
                        >Pilih Rute</p>
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
                                    <Select name="from" value={fromValue}  onValueChange={(e) => setFromValue(e)}>
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
                                <div className='flex-1'>
                                    <Button onClick={handleSwap} variant={'outline'}>
                                        <RefreshCcw></RefreshCcw>
                                    </Button>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="pemberangkatan">To</Label>
                                    <Select name="to" value={toValue} onValueChange={(e) => setToValue(e)}>
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
                                    <Input
                                        type='hidden'
                                            name='round_trip'
                                            id='round_trip'
                                            value={roundTrip+""}
                                    ></Input>
                                    <div className='flex items-center gap-4'>
                                        <Toggle pressed={roundTrip}
                                            onPressedChange={setRoundTrip}
                                            variant="default"
                                            defaultPressed= {true}>
                                            {!roundTrip && <ToggleLeft  className="w-18 h-18" />}
                                            {roundTrip && <ToggleRight className=" w-18 h-18" />}
                                        </Toggle>
                                        <Label htmlFor="round_trip">Round Trip</Label>

                                    </div>
                                        { roundTrip && <><Input
                                            id="date2"
                                            className="mt-1 block w-full"
                                            name="date2"
                                            type="date"
                                            defaultValue={formData.date2}
                                            autoComplete="tujuan"
                                            placeholder="Tanggal"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message=""
                                        />
                                        </>
                                    }
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
                { (result.length == 0) && <div className='p-4'>
                    <img className='border rounded-xl' src="images/banner-jaketboat.png"></img>
                </div>
                }
                <div className='font-bold p-4'>
                    {(result.length > 0) && <p>Tiket Tersedia</p>}
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
                                            <h2 className='font-bold'>{item.ship.toUpperCase()}</h2>
                                            <h1>{item.type}</h1>
                                            <h1>{item.available} Kursi Tersisa</h1>
                                        </div>
                                        <div className='flex-none h-full'>
                                            <p className='font-bold'>IDR {item.price}</p>
                                            <Button variant={(item.id== scheduleB)?"outline":"default"} onClick={()=>
                                                    setScheduleB(item.id)
                                            } className='h-full'>{(item.id== scheduleB)?"Terpilih":"Pilih"}</Button>
                                        </div>
                                   </div>
                                   <div className='flex pt-2'>
                                        <span className='text-center font-bold text-xs text-blue-400'>RUTE : {item.route}</span>
                                   </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className='font-bold p-4'>
                    {(result2.length > 0) && <p>Tiket Balik</p>}
                </div>
                <div className="p-4 grid auto-rows-min gap-4 md:grid-cols-3">
                    {result2.map((item) => (
                        <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            <Card className="rounded-xl">
                                <CardContent className="pl-4 pr-4">
                                   <div className='border-b border-sidebar-border/80 flex gap-2 items-center'>
                                        <div className='flex-none'>
                                            <span className='font-bold text-lg text-blue-500'>{item.time}</span>
                                        </div>
                                        <div className='flex-1'>
                                            <h2 className='font-bold'>{item.ship.toUpperCase()}</h2>
                                            <h1>{item.type}</h1>
                                            <h1>{item.available} Kursi Tersisa</h1>
                                        </div>
                                        <div className='flex-none h-full'>
                                            <p className='font-bold'>IDR {item.price}</p>
                                            <Button variant={(item.id== scheduleP)?"outline":"default"} onClick={()=>
                                                    setScheduleP(item.id)
                                            } className='h-full'>{(item.id== scheduleP)?"Terpilih":"Pilih"}</Button>
                                        </div>
                                   </div>
                                   <div className='flex pt-2'>
                                        <span className='text-center font-bold text-xs text-blue-400'>RUTE : {item.route}</span>
                                   </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
                                
                <div className="flex justify-end pt-2 m-5">
                    {(scheduleP!=0 && scheduleB != 0) && 
                        <Button size="lg" onClick={handleSubmit}>
                        PESAN SEKARANG
                        </Button>
                    }   
                </div>
            </div>
        </AppLayout>
    );
}
