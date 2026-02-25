<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Param;
use App\Models\Passenger;
use App\Models\Ticket;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use GuzzleHttp\Client;



class HomeController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function dashboard(Request $request): Response
    {
        $destination = DB::table("tb_destination")->select('id','name')->get();        

        $result = array();
        $from = $request->get('from', "1");
        $to = $request->get('to', "1");
        $date = $request->get('date',Date('Y-m-d'));
        $person = $request->get('person', 1);
        
        $form["from"] = $from;
        $form["to"] = $to;
        $form["date"] = $date;
        $form["person"] = $person;

        session($form);
        $route = DB::select("select ts.id_route, ts.id,ts2.name ship,ts2.type , ts.tanggal,ts.jam_berangkat, tr.name,ts.price from tb_route tr 
            inner join tb_route_detail trd on trd.id_route = tr.id 
            inner join tb_destination td on td.id = trd.id_destination
            inner join tb_schedule ts on ts.id_route = tr.id 
            inner join tb_ship ts2 on ts2.id = ts.id_ship 
            where td.id in($from,$to) and $from <> $to and ts.tanggal ='$date'
            group by ts.id_route, ts2.type,ts.price , ts.id,tr.id,ts2.name , tr.name,ts.tanggal,ts.jam_berangkat  
            having count(*) > 1
            order by tr.name asc;");
        foreach($route as $tmp){
            $items["id"] = $tmp->id;
            $items["name"]= $tmp->name;
            $items["route"] = "Muara Angke > Untung Jawa";
            $items["ship"] = $tmp->ship;
            $items["type"] = $tmp->type;            

            $allDestination=DB::table("tb_route_detail")
                ->select("tb_destination.*")
                ->join("tb_destination","tb_route_detail.id_destination","tb_destination.id")
                ->where("id_route",$tmp->id_route)
                ->orderBy("tb_route_detail.id")
                ->get();
            $arrDestination = array();
            $available =100;
            $cek=false;
            foreach($allDestination as $itemDest){

                if($itemDest->id == $from){
                    $cek = true;
                }
                if($itemDest->id == $to){
                    $cek = false;
                }
                if($cek){
                    $tmpAvailable = DB::table("tb_slot")
                        ->where("id_schedule",$tmp->id)
                        ->where("id_destination",$itemDest->id)
                        ->where("availability","0")
                        ->count();
                    if($tmpAvailable<$available){
                        $available=$tmpAvailable;
                    }
                }
                array_push($arrDestination,$itemDest->short_name);
            }
            $items["route"]= join(" > ",$arrDestination);
            $items["available"] = $available;
            $items["time"] = substr($tmp->jam_berangkat,0,5);
            $items["price"] = number_format($tmp->price,0);
            if($available> $person){
                array_push($result,$items);
            }
        }
        return Inertia::render('dashboard',["destination"=>$destination,'result'=>$result,'formData'=>$form]);
    }
    public function search(Request $request): Response
    {
        $destination = DB::table("tb_destination")->select('id','name')->get();        
        return Inertia::render('dashboard',["destination"=>$destination]);
    }

    public function destination(Request $request):Response{
        $destination = DB::table("tb_destination")->select('id','name')->get();        
        return Inertia::render('destination',["destination"=>$destination]);        
    }
    public function ship(Request $request):Response
    {
        $ship = DB::table("tb_ship")->select('id','name')->get();        
        return Inertia::render('ship',["ship"=>$ship]);       
    }
    public function order(Request $request):Response
    {
        $id_customer = auth()->id();
        $ticket = DB::table("tb_ticket")
            ->select("tb_ticket.*","tb_ship.name","tb_schedule.tanggal","tb_schedule.jam_berangkat")
            ->join("tb_schedule","tb_schedule.id","tb_ticket.id_schedule")
            ->join("tb_ship","tb_schedule.id_ship","tb_ship.id")
            ->where("id_customer",$id_customer)
            ->get();        
        return Inertia::render('ticket',["ListTicket"=>$ticket]);       
    }
    public function pesan($id,Request $request){
        $data["id_schedule"] = $id;
        $data["id_customer"] = auth()->id();
        $data["total_passenger"] = session("person");
        $payment_code = Str::random(16); 
        $data["payment_code"]=$payment_code;
        $data["id_destination_from"] = session("from");
        $data["id_destination_to"] = session("to");
        $data["total_payment"] = DB::table("tb_schedule")->where("id",$id)->value("price")*session("person");
        DB::table("tb_ticket")->insert($data);
        return to_route('request_order_detail',$payment_code);
    }
    public function pesan_detail($payment_code,Request $request){  
        $tiket = DB::table("tb_ticket")->where("payment_code",$payment_code)->first();
        $arrKursi = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,18,20,21,22,23,24,25,26,27,28,29,30];
        $selectedKursi = array();
        for($i=0; $i < $tiket->total_passenger;$i++){
            $indexKursi = 0;
            $cek = true;
            while($cek){
                if($indexKursi < count($arrKursi)){
                if(!in_array($arrKursi[$indexKursi], $selectedKursi, true)){
                    if($this->kursi_available($arrKursi[$indexKursi],$tiket->id_schedule)){
                        $cek = false;
                        $kursi["id"]=$i;
                        $kursi["no_kursi"]=$arrKursi[$indexKursi];
                        array_push($selectedKursi,$kursi);
                    }
                }
                $indexKursi++;
                }else{
                    $cek=false;
                }
            }
        }
        return Inertia::render('pesan_detail', [
            "tiket" => $tiket,
            "list_kursi" => $selectedKursi,
            "paymentData" => session('paymentData'),
        ]);
    }

    public function submitPassengers($payment_code, Request $request)
    {
        $request->validate([
            'passengers'             => 'required|array',
            'passengers.*.nik'       => 'required|digits:16',
            'passengers.*.nama'      => 'required|string|max:255',
            'passengers.*.foto_ktp'  => 'required|image|max:5120',
        ]);

        $niks = collect($request->input('passengers'))->pluck('nik');
        if ($niks->count() !== $niks->unique()->count()) {
            return back()->withErrors(['passengers' => 'NIK tidak boleh sama antar penumpang.']);
        }

        $tiket = Ticket::where('payment_code', $payment_code)->firstOrFail();

        foreach ($request->input('passengers') as $index => $p) {
            $file = $request->file("passengers.{$index}.foto_ktp");
            $file->storeAs('ktp', $payment_code."-".$p['nik'].'.'.$file->getClientOriginalExtension(), 'public');

            Passenger::create([
                'id_request'   => $tiket->id,
                'nik'          => $p['nik'],
                'name'         => $p['nama'],
                'code'         => $p['no_kursi'],
                'booking_code' => $payment_code . '-' . $index,
            ]);
        }

        $paymentUrl = Param::where('key', 'PAYMENT_URL')->value('value');

        session()->flash('paymentData', [
            'payment_url'  => $paymentUrl,
            'order_id'     => $payment_code,
            'gross_amount' => $tiket->total_payment,
        ]);

        return to_route('request_order_detail', $payment_code);
    }

    public function kursi_available($no,$id_schedule){
        $available = true;        
        $allDestination=DB::table("tb_route_detail")
            ->select("tb_destination.*")
            ->join("tb_destination","tb_route_detail.id_destination","tb_destination.id")
            ->join("tb_schedule","tb_schedule.id_route","tb_route_detail.id_route")
            ->where("tb_schedule.id",$id_schedule)
            ->orderBy("tb_route_detail.id")
            ->get();
        $arrDestination = array();
        $available =100;
        $cek=false;
        $arrKursi = array();
        foreach($allDestination as $itemDest){

            if($itemDest->id == session("from")){
                $cek = true;
            }
            if($itemDest->id == session("to")){
                $cek = false;
            }
            if($cek){
                $tmpAvailable = DB::table("tb_slot")
                    ->where("id_schedule",$id_schedule)
                    ->where("id_destination",$itemDest->id)
                    ->where("code",$no)
                    ->where("availability","1")
                    ->first();
                if($tmpAvailable){
                    $available = false;
                }
            }
        }
        return $available;
    }

    public function payment_page(Request $request) {
        $param = Param::all()->pluck('value', 'key')->toArray();
        $client = new Client();
        $isDebug = config('app.debug');
        $serverKey = $isDebug ? $param['MIDTRANS_SERVER_KEY_SB'] : $param['MIDTRANS_SERVER_KEY_PROD'];
        $transaction_endpoint = $isDebug ? $param['MIDTRANS_TRANSACTION_API_SB'] : $param['MIDTRANS_TRANSACTION_API_PROD'];
        
        $final_amount = (int)$request->gross_amount + (int)$param['ADMIN_FEE'];
        $response = $client->request('POST', $transaction_endpoint, [
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'Authorization' => 'Basic ' . base64_encode($serverKey),
            ],
            'body' => json_encode([
                'transaction_details' => [
                    'order_id' => $request->order_id,
                    'gross_amount' => $final_amount,
                ],
            ]),
        ]);
        $data = json_decode($response->getBody(), true);
        
        return view('payment', [
            'snap_token' => $data['token'],
            'js_endpoint' => $isDebug ? $param['MIDTRANS_JS_ENDPOINT_SB'] : $param['MIDTRANS_JS_ENDPOINT_PROD'],
            'client_key' => $isDebug ? $param['MIDTRANS_CLIENT_KEY_SB'] : $param['MIDTRANS_CLIENT_KEY_PROD']
        ]);
    }

    public function view_ticket($id,Request $request){
        $passanger = DB::table("tb_passenger")->where("id_request",$id)->get();
        $detail = DB::table("tb_ticket")
            ->select("tb_ship.name","tb_schedule.*","tb_ticket.id_destination_from","tb_ticket.id_destination_to")
            ->join("tb_schedule","tb_schedule.id","tb_ticket.id_schedule")
            ->join("tb_ship","tb_ship.id","tb_schedule.id_ship")
            ->where("tb_ticket.id",$id)->first();
        $detail->jam_berangkat = substr($detail->jam_berangkat,0,5);
        $detail->jam_sampai = date('H:i', strtotime($detail->jam_berangkat . ' +2 hour'));
        $detail->from = DB::table("tb_destination")->where("id",$detail->id_destination_from)->value("name");
        $detail->to = DB::table("tb_destination")->where("id",$detail->id_destination_to)->value("name");

        return Inertia::render('view_ticket', [
            "ListPassanger" => $passanger,
            "detail" => $detail,
        ]);
    }
}