import {message} from 'antd';
import axios from 'axios';


export default function ajax(url,data={},method="GET"){
    let promise;
    return new Promise((resolve,reject)=>{
        if(method==="GET"){
            promise=axios.get(url,{ params:data})
         }else{
            promise= axios.post(url,data)
         }
         promise.then(response=>{
            resolve(response.data)
         }).catch(error=>{
            message.error("请求出错了:"+error.message);
         })
 
    })
 
}