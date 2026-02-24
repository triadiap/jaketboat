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
    tota_passanger:number;
    payment_code:string;
    status:string;
    midtrans_trans_id:string;
}