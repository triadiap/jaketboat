import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { MasterTiket, BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
 } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tujuan Wisata',
        href: dashboard().url,
    },
];

export type PageResult = {
    id: number;
    no_kursi: string;
}

type PaymentData = {
    payment_url: string;
    order_id: string;
    gross_amount: number;
}

interface PassengerData {
    nik: string;
    nama: string;
    titles:string;
    type_identity:string;
    foto_ktp: File | null;
    no_kursi: string;
}

interface PassengerErrors {
    nik?: string;
    nama?: string;
    foto_ktp?: string;
    no_kursi?: string;
    titles?: string;
    type_identity?: string;
}

interface SeachProps {
    tiket: MasterTiket;
    list_kursi: PageResult[];
    paymentData?: PaymentData;
}

export default function Dashboard({ tiket, list_kursi, paymentData }: SeachProps) {
    const [passengers, setPassengers] = useState<PassengerData[]>(
        list_kursi.map((item) => ({titles:'',type_identity:'', nik: '', nama: '', foto_ktp: null, no_kursi: item.no_kursi }))
    );
    const [errors, setErrors] = useState<PassengerErrors[]>(
        list_kursi.map(() => ({}))
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        if (paymentData) {
            setDialogOpen(true);
        }
    }, [paymentData]);

    function updatePassenger(index: number, field: keyof PassengerData, value: string | File | null) {
        setPassengers(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
        setErrors(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: undefined };
            return updated;
        });
    }

    function validate(): boolean {
        const newErrors: PassengerErrors[] = list_kursi.map(() => ({}));
        let valid = true;
        const nikSeen = new Set<string>();

        passengers.forEach((p, i) => {
            if (!p.nik) {
                newErrors[i].nik = 'NIK wajib diisi.';
                valid = false;
            } else if (!/^\d{16}$/.test(p.nik)) {
                newErrors[i].nik = 'NIK harus tepat 16 digit angka.';
                valid = false;
            } else if (nikSeen.has(p.nik)) {
                newErrors[i].nik = 'NIK tidak boleh sama dengan penumpang lain.';
                valid = false;
            } else {
                nikSeen.add(p.nik);
            }

            if (!p.nama.trim()) {
                newErrors[i].nama = 'Nama wajib diisi.';
                valid = false;
            }

            if (!p.foto_ktp) {
                newErrors[i].foto_ktp = 'Foto KTP wajib diunggah.';
                valid = false;
            }
        });

        setErrors(newErrors);
        return valid;
    }

    function handleSubmit() {
        if (!validate()) return;

        const formData = new FormData();
        passengers.forEach((p, i) => {
            formData.append(`passengers[${i}][nik]`, p.nik);
            formData.append(`passengers[${i}][nama]`, p.nama);
            formData.append(`passengers[${i}][type_identity]`, p.type_identity);
            formData.append(`passengers[${i}][titles]`, p.titles);
            if (p.foto_ktp) {
                formData.append(`passengers[${i}][foto_ktp]`, p.foto_ktp);
            }
            formData.append(`passengers[${i}][no_kursi]`, p.no_kursi);
        });

        router.post(`/pesan_tiket_detail/${tiket.payment_code}`, formData);
    }

    const iframeUrl = paymentData
        ? `${paymentData.payment_url}?order_id=${encodeURIComponent(paymentData.order_id)}&gross_amount=${encodeURIComponent(paymentData.gross_amount)}`
        : '';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Penumpang" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Heading title="Detail Penumpang"
                    description='Silahkan isikan data sesuai KTP penumpang'
                    variant='small'
                />
                <div className="grid auto-rows-min gap-4 md:grid-cols-3 ">
                    {list_kursi.map((item, index) => (
                        <div key={item.id} className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            <Card className="rounded-xl">
                                <CardHeader className="pb-2 pl-4 pt-4">
                                    <CardTitle className="text-base">Data penumpang {(list_kursi.length > 1) && "ke-"&& index }</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3 pl-4 pr-4 pb-4">
                                    <div className="flex flex-col gap-1">
                                        <Label htmlFor={`nokursi-${index}`}>No Kursi</Label>
                                        <Input
                                            id={`nokursi-${index}`}
                                            type="text"
                                            inputMode="numeric"
                                            value={passengers[index].no_kursi}
                                            onChange={e =>
                                                updatePassenger(index, 'no_kursi', e.target.value.replace(/\D/g, '').slice(0, 16))
                                            }
                                            aria-invalid={!!errors[index]?.no_kursi}
                                            readOnly
                                        />
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground ml-auto text-xs">
                                                Otomatis dari sistem
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <Label htmlFor={`nik-${index}`}>No. Identity</Label>
                                        <div className='flex'>
                                            <div className='flex-none w-[100px]'>
                                                <Select name="type_identity" onValueChange={(val)=>updatePassenger(index, 'type_identity', val)} defaultValue={passengers[index].type_identity}>
                                                    <SelectTrigger id={`type_identity-${index}`} className="w-full">
                                                        <SelectValue placeholder=""  />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem  value="ktp">KTP</SelectItem>
                                                            <SelectItem  value="paspor">Paspor</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className='flex-1 pl-2'>
                                                <Input
                                                    id={`nik-${index}`}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={16}
                                                    placeholder="16 digit NIK"
                                                    value={passengers[index].nik}
                                                    onChange={e =>
                                                        updatePassenger(index, 'nik', e.target.value.replace(/\D/g, '').slice(0, 16))
                                                    }
                                                    aria-invalid={!!errors[index]?.nik}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <InputError message={errors[index]?.nik} />
                                            <span className="text-muted-foreground ml-auto text-xs">
                                                {passengers[index].nik.length}/16
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <Label htmlFor={`nama-${index}`}>Nama</Label>
                                        <div className='flex'>
                                            <div className='flex-none w-[100px]'>
                                                <Select onValueChange={(val)=>updatePassenger(index, 'titles', val)}  defaultValue={passengers[index].titles}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Title"  />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem  value="Tn">Tuan</SelectItem>
                                                            <SelectItem  value="Ny">Nyonya</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className='flex-1 pl-2'>
                                                <Input
                                                    id={`nama-${index}`}
                                                    type="text"
                                                    placeholder="Nama sesuai KTP"
                                                    value={passengers[index].nama}
                                                    onChange={e => updatePassenger(index, 'nama', e.target.value)}
                                                    aria-invalid={!!errors[index]?.nama}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground ml-auto text-xs">
                                        <InputError message={errors[index]?.nama} />
                                                Pastikan nama sesuai ktp
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <Label htmlFor={`foto-${index}`}>Foto Identitas</Label>
                                        <Input
                                            id={`foto-${index}`}
                                            type="file"
                                            accept="image/*"
                                            onChange={e =>
                                                updatePassenger(index, 'foto_ktp', e.target.files?.[0] ?? null)
                                            }
                                            aria-invalid={!!errors[index]?.foto_ktp}
                                        />
                                            <span className="text-muted-foreground ml-auto text-xs">
                                                <InputError message={errors[index]?.foto_ktp} />
                                                Pastikan file identitas sesuai
                                            </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end pt-2">
                    <Button size="lg" onClick={handleSubmit}>
                        PESAN SEKARANG
                    </Button>
                </div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={() => {}}>
                <DialogContent
                    className="flex h-[90vh] max-w-3xl flex-col p-0 [&>button[data-slot=dialog-close]]:hidden"
                    onPointerDownOutside={e => e.preventDefault()}
                    onEscapeKeyDown={e => e.preventDefault()}
                    onInteractOutside={e => e.preventDefault()}
                >
                    <DialogHeader className="px-6 pt-6 pb-2">
                        <DialogTitle>Pembayaran Tiket</DialogTitle>
                    </DialogHeader>
                    {paymentData && (
                        <iframe
                            src={iframeUrl}
                            className="min-h-0 flex-1 border-0"
                            title="Payment Gateway"
                            allow="payment"
                        />
                    )}
                    <div className="flex justify-end px-6 pb-4">
                        <Button variant="outline" onClick={() => setConfirmOpen(true)}>
                            Tutup Pembayaran
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi</DialogTitle>
                        <DialogDescription>
                            Apakah Anda sudah menyelesaikan pembayaran?
                            Pastikan Anda sudah menyimpan informasi pembayaran sebelum menutup halaman ini.
                        </DialogDescription>
                    </DialogHeader>                    
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                            Kembali ke Pembayaran
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                setConfirmOpen(false);
                                setDialogOpen(false);
                                router.visit('/pesanan');
                            }}
                        >
                            Ya, Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
