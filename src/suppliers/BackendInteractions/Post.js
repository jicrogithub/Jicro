import { create } from 'zustand';
import axios from "axios"
import IP from '../../constants/IP';
import { getData } from '../../helper/LocalStorage';
const url = IP.local
const usePost = create(
    (set) => ({
        shouldRedirect: false,
        orderID: "",
        shouldRedirectToMapSP:false,
        shouldRefreshProfileScreen:false,
        changeRedirections: (boolean) => {
            set(() => ({
                shouldRedirect: boolean
            }))
        },
        addService: async (data) => {
            const { title, images, price, provider, details, note, included, notIncluded } = data
            const token = await getData("token")
            await axios.post(`${url}/add-service`, {
                token, title, images, price, provider, details, note, included, notIncluded
            }).then((e) => {
               set(() => ({
                    shouldRedirect: true
                }))
            }).catch((e) => {
                
            })
        },
        orderService: async (service_id, service_provider_id, note) => {
            const token = await getData("token")
            await axios.post(`${url}/order-service`, {
                service_id, service_provider_id, note: note ? note : null, token
            }).then((e) => {
                set(() => ({
                    orderID: e.data.orderID,
                    shouldRedirect: true
                }))
            })
        },
        updateStatus : async (_id, status) => {
            set(()=>({
                shouldRedirectToMapSP:false
            }))
            await axios.post(`${url}/update-status`, {
                _id, status
            }).then((e) => {
                set(()=>({
                    shouldRedirectToMapSP:e.response
                }))
            })
        },
        updateProfile : async (updates) => {
            set(()=>({
                shouldRefreshProfileScreen:false
            }))
            const token = await getData("token")
            set(()=>({
                shouldRefreshProfileScreen:false
            }))
            await axios.post(`${url}/update-profile`, {
                token,
                updates
            }).then((e) => {
                set(()=>({
                    shouldRefreshProfileScreen:true
                }))
            })
        }
    }));


export { usePost }
