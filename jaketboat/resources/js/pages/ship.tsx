import { Form, Head, Link, usePage  } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type {MasterDestination, BreadcrumbItem } from '@/types';
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



export type PageData = {
    to: string;
    from: string;
    date: string;
    person: string;
}

export type PageResult = {
    time: string;
    ship: string;
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
            <Head title="Tujuan Pulau" />
        </AppLayout>
    );
}
