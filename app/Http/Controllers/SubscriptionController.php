<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Subscription;


class SubscriptionController extends Controller
{
    public function add_subscription(Request $request){
        $validator = Validator::make($request->all(), [
            'duration' => 'required',
            'days' => 'required',
            'price' => 'required',
            'description' => 'required',
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $subscription = new Subscription();
            $subscription->duration = $request->duration;
            $subscription->days  = $request->days;
            $subscription->price = $request->price;
            $subscription->description = $request->description;
            
            $subscription->save();
            $response = ['status' => 200 , 'msg' => 'Subscription Added successfully.' , 
                         'subscription' => $subscription];
            return $response;   
        }
    }
    public function subscription_list(Request $request){
        $subscriptions = Subscription::where('delete_status',0)->get();
        $response = [ 'msg'=>'Subscription', 'status'=>'200', 'subscription'=> $subscriptions];
        return $response;
    }
    // public function subscription_list()
    // {
    //     $subscriptions = Subscription::where('is_delete',0)->get();
    //     $response = ['status' => 200 ,
    //             'subscriptions' =>  $subscriptions];
    //     return $response;
    // }
    // public function delete_subscription(Request $request){
    //     $subscriptions = Subscription::where('id',$request->id)->delete();
    //     $response = [ 'msg'=>'Subscription Deleted', 'status'=>'200'];
    //     return $response;
    // }
          public function delete_subscription(Request $request) {
        
            $subscriptions = Subscription::where('id', $request->id)->update([
                'delete_status' => true,
               
            ]);
            $response = [
                'status' => 200,
                'msg' => 'Successfully Deleted'
            ];
            return $response;
        }
        public function get_subscription_by_id(Request $request){
            $subscription = Subscription::find($request->id);
            $response = ['msg'=> 'subscription Sent', 'status'=> '200' , 'subscription'=> $subscription];
            return $response;
        }
        public function update_subscription(Request $request)
    
        {
             $subscription = Subscription::find($request->id);
             $subscription->duration = $request->duration;
             $subscription->days  = $request->days;
             $subscription->price = $request->price;
             $subscription->description = $request->description;
             $subscription->save();
             $response = ['msg'=> 'subscription Updated', 'status'=> '200'];
             return $response;
   
    }
  
}
