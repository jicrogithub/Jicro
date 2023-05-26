import { create } from 'zustand';
import axios from "axios"
import IP from '../../constants/IP';
import { getData } from '../../helper/LocalStorage';
import { getCurrentPostiton } from './../../helper/Location';
const url = IP.local
const useFetch = create(
    (set) => ({
        data: {}, // Profile ~ Data [Service Provider's]
        c_data: {}, //
        sc_data: {}, // 
        serviceData: {},
        ordersData: {},
        bookingsData: {},
        allServicesData: {},
        searchData: {},
        getSP: async () => {
            const token = await getData("token")
            await axios.post(`${url}/get-sp`, {
                token
            }).then((e) => {

                set(() => ({
                    data: e.data.data
                }))
            }).catch((e) => {

            })
        },
        getServices: async (category, sub_category) => {
            const coords = await getCurrentPostiton();
            const requestParams = {
              latitude: coords.latitude,
              longitude: coords.longitude,
              limit: 40,
              radius: 5000,
              category: category ? category?.toLowerCase():"",
              subCategory: sub_category ? sub_category?.toLowerCase():"",
            };
            console.log(requestParams)
            try {
              const response = await axios.post(`${url}/get-services`, requestParams);
              const responseData = response.data.length === 0 ? {} : response.data;
          
              if (category && sub_category) {
                set(() => ({
                  sc_data: responseData,
                }));
              } else if (category) {
                set(() => ({
                  c_data: responseData,
                }));
              } else {
                set(() => ({
                  data: responseData,
                }));
              }
            } catch (error) {
              // Handle error
            }
          },
          
        getService: async (_id) => {
            set(() => ({
                serviceData: {}
            }))
            await axios.post(`${url}/get-service`, {
                _id
            }).then((e) => {
                set(() => ({
                    serviceData: e.data
                }))
            }).catch((e) => {

            })
        },
        getOrders: async () => {
            const token = await getData('token');
            await axios.post(`${url}/get-orders`, {
                token
            }).then((e) => {
                set(() => ({
                    ordersData: e.data.data
                }))
            }).catch(() => {
            })
        },
        getBookings: async () => {
            const token = await getData('token');
            await axios.post(`${url}/get-bookings`, {
                token
            }).then((e) => {
                set(() => ({
                    bookingsData: e.data.data
                }))
            })
        },
        getAllServices: async () => {
            const token = await getData('token');
            await axios.post(`${url}/get-all-services`, {
                token
            }).then((e) => {
                set(() => ({
                    allServicesData: e.data.data
                }))
            })
        },
        search: async (term) => {
            await axios.post(`${url}/search`, {
                term
            }).then((e) => {
                set(() => ({
                    searchData: e.data.data
                }))
            })
        },

    }));

export { useFetch }
