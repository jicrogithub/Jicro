import { create } from 'zustand';
import IP from '../../constants/IP';
import axios from "axios"
import { getData, setData } from "../../helper/LocalStorage"
import { messagePopup } from '../../helper/Message';
const url = IP.local
const useAuth = create(
    (set) => ({
        shouldNavigateUser: false,
        shouldNavigateServiceProvider: false,
        isError: false,
        verifyUser: async (waId, data) => {
            const token = await getData('fcm-token')
            await axios.post(`${url}/auth-user`, {
                waId,
                address: data.address,
                lat: data.lat,
                long: data.long,
                token
            }).then((e) => {
                setData("token", e.data.token)
                setData("auth-user", "true")
                set(() => ({
                    shouldNavigateUser: true
                }))
            }).catch((e) => {
            })
        },
        verifyServiceProvider: async (waId, data) => {
            if (data === undefined) {
                const token = await getData('fcm-token')
                await axios.post(`${url}/auth-service-provider`, {
                    waId,
                    type: "login",
                    token
                }).then((e) => {
                    setData("token", e.data.token)
                    setData("auth-service-provider", "true")
                    set(() => ({
                        shouldNavigateServiceProvider: true
                    }))
                }).catch((e) => {
                    messagePopup(e.response.data.error, "","danger")
                })
            } else {
                const token = await getData('fcm-token')
                await axios.post(`${url}/auth-service-provider`, {
                    waId,
                    address: data.address,
                    name: data.name,
                    profession: data.profession,
                    logo: data.logo,
                    banner: data.banner,
                    proof: data.proof,
                    coords: data.coords,
                    token
                }).then((e) => {
                    console.log(e.data)
                    setData("token", e.data.token)
                    setData("auth-service-provider", "true")
                    set(() => ({
                        shouldNavigateServiceProvider: true
                    }))
                }).catch((e) => {
                    messagePopup(e.response.data.error, "","danger")
                    // console.log(e.response)
                })
            }
        },
        verifyTest: async (test_num) => {
            const data =  await axios.post(`${url}/auth-user`, {
                test_num
            })
            setData("token", data.data.token)
            setData("test-user", "true")
            set(() => ({
                shouldNavigateUser: true
            }))

        }
    }));



export { useAuth }
