export type * from './auth';
export type * from './navigation';
export type * from './ui';


export type MasterDestination = {
    id: number;
    name: string;
    short_name: string;
}


export type MasterTiket = {
    id: number;
    id_schedule: number;
    id_customer: number;
    total_passenger:number;
    to:string;
    from:string;
    payment_code:string;
    status:string;
    midtrans_trans_id:string;
    name:string;
    tanggal:string;
    jam_berangkat:string;
}