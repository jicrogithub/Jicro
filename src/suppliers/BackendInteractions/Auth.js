import { create } from 'zustand';
import axios from "axios"
const url = "http://192.168.50.205:8080"
import { setData } from "../../helper/LocalStorage"
const useAuth = create(
    (set) => ({
        shouldNavigate: false,
        verifyUser: async (waId,data) => {
                await axios.post(`${url}/auth-user`, {
                    waId,
                    address: data.address,
                }).then((e) => {
                    console.log(e.data)
                    setData("token", e.data.user.token)
                    setData("auth", "true")
                    set(() => ({
                        shouldNavigate: true
                    }))
                }).catch((e) => {
                    console.log(e)
                })
        },
        verifyServiceProvider: async (waId,data) => {
            console.log(data)
            await axios.post(`${url}/auth-service-provider`, {
                waId,
                address: data.address,
                name: data.name,
                profession: data.profession,
                logo: data.logo,
                banner: data.banner,
                proof: data.proof
            }).then((e) => {
                console.log(e)
                // setData("token", e.data.token)
                // setData("auth", "true")
                // set(() => ({
                //     shouldNavigate: true
                // }))
            }).catch((e) => {
                console.log(e)
            })
        }
}));



export { useAuth }
