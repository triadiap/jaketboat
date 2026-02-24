import { Form, Head, Link, usePage  } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type {MasterDestination,MasterTiket, BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import Heading from '@/components/heading';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tujuan Wisata',
        href: dashboard().url,
    },
];

export type PageResult = {
    id:number;
    no_kursi: string;
}

interface SeachProps{
    tiket:MasterTiket;
    list_kursi:PageResult[];
}

export default function Dashboard({tiket,list_kursi}:SeachProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Penumpang" />
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <Heading
                        title='Detail Penumpang'
                    ></Heading>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {list_kursi.map((item) => (
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Card className="rounded-xl">
                            <CardContent className="pl-4 pr-4">
                                {item.no_kursi}
                            </CardContent>
                        </Card>
                    </div>
                ))}
                </div>
                </div>
        </AppLayout>
    );
}
