import { create } from 'zustand';
import axios from "axios"
import IP from '../../constants/IP';
import { getData } from '../../helper/LocalStorage';
import { getCurrentPostiton } from './../../helper/Location';
const url = IP.local
const useFetch = create(
    (set) => ({
        data:{}, // Profile ~ Data [Service Provider's]
        serviceData:{},
        ordersData:{},
        bookingsData:{},
        allServicesData:{},
        searchData:{},
        getSP: async () => {
            const token  = await getData("token")
            await axios.post(`${url}/get-sp`,{
                token
            }).then((e)=>{
                
                set(()=>({
                    data:e.data.data
                }))
            }).catch((e)=>{
                
            })
        },
        getServices: async () => {
            const coords = await getCurrentPostiton();
            await axios.post(`${url}/get-services`,{
                latitude:coords.latitude,
                longitude:coords.longitude,
                limit:10,
                radius:1000
            }).then((e)=>{
                set(()=>({
                    data:e.data
                }))
            }).catch((e)=>{
                
            })
        },
        getService: async (_id) => {
            await axios.post(`${url}/get-service`,{
                _id
            }).then((e)=>{
                set(()=>({
                    serviceData:e.data
                }))
            }).catch((e)=>{
                
            })
        },
        getOrders: async () => {
            const token = await getData('token');
            await axios.post(`${url}/get-orders`,{
                token
            }).then((e)=>{
                set(()=>({
                    ordersData:e.data.data
                }))
            }).catch(()=>{
            })
        },
        getBookings: async () => {
            const token = await getData('token');
            await axios.post(`${url}/get-bookings`,{
                token
            }).then((e)=>{
                set(()=>({
                    bookingsData:e.data.data
                }))
            })
        },
        getAllServices: async () => {
            const token = await getData('token');
            await axios.post(`${url}/get-all-services`,{
                token
            }).then((e)=>{
                set(()=>({
                    allServicesData:e.data.data
                }))
            })
        },
        search: async (term) => {
            await axios.post(`${url}/search`,{
                term
            }).then((e)=>{
                set(()=>({
                    searchData:e.data.data
                }))
            })
        },

    }));

export { useFetch }
