  
import {apiConstants} from '../constants'
import  axios from "axios" 
export const apiService = {
    zabbix,
    get,
    search
};

function zabbix(data) {
     return axios.post( `${apiConstants.uri}`,data,{ headers: {'Content-Type': 'application/json'}})
        .then(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return data;
        })
        .catch((e)=>{
            if(e.response.status === 400) {
                e.message = e.response.data
                return Promise.reject(e);
            }
        })
}

function get() {
    return axios.get( `${apiConstants.uri}/tokenizer`,{ headers: {'Content-Type': 'application/json'}})
       .then(data => {
           // store user details and jwt token in local storage to keep user logged in between page refreshes
           return data;
       })
       .catch((e)=>{
           if(e.response.status === 400) {
               e.message = e.response.data
               return Promise.reject(e);
           }
       })
}

function search(data) {
    return axios.post( `${apiConstants.uri}/tokenizer`,data,{ headers: {'Content-Type': 'application/json'}})
       .then(data => {
           // store user details and jwt token in local storage to keep user logged in between page refreshes
           return data;
       })
       .catch((e)=>{
           if(e.response.status === 400) {
               e.message = e.response.data
               return Promise.reject(e);
           }
       })
}
