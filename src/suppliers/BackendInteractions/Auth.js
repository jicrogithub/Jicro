import { create } from 'zustand';
import axios from "axios"
const url = "http://192.168.50.205:8080"
import { setData } from "../../helper/LocalStorage"
const useAuth = create(
    (set) => ({
        shouldNavigateUser: false,
        shouldNavigateServiceProvider: false,
        verifyUser: async (waId,data) => {
                await axios.post(`${url}/auth-user`, {
                    waId,
                    address: data.address,
                }).then((e) => {
                    console.log(e.data)
                    setData("token", e.data.user.token)
                    setData("auth-user", "true")
                    set(() => ({
                        shouldNavigateUser: true
                    }))
                }).catch((e) => {
                    console.log(e)
                })
        },
        verifyServiceProvider: async (waId,data) => {
            
            await axios.post(`${url}/auth-service-provider`, {
                waId,
                address: data.address,
                name: data.name,
                profession: data.profession,
                logo: data.logo,
                banner: data.banner,
                proof: data.proof
            }).then((e) => {
                console.log(e.data)
                setData("token", e.data.user.token)
                setData("auth-service-provider", "true")
                set(() => ({
                    shouldNavigateServiceProvider: true
                }))
            }).catch((e) => {
                console.log(e)
            })
        }
}));



export { useAuth }
