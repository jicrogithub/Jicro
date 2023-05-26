import { create } from 'zustand';
import axios from "axios"
import IP from '../../constants/IP';
const url = IP.local
const useUpload = create(
    (set) => ({
        uri: "",
        imageFor: "",
        upload: async (file, imageFor) => {
            try {
                let formData = new FormData();
                formData.append('img', {
                    uri: file.uri,
                    type: file.type,
                    name: file.fileName.replace("rn_image_picker_lib_temp", "jicro"),
                });
                await axios.post(`${url}/upload`, formData, {
                    headers: {
                        Accept: "application/json",
                        'Content-Type': 'multipart/form-data',
                    }
                }).then((e) => {
                    set(() => ({
                        uri: e.data.result,
                        imageFor: imageFor
                    }))
                }).catch((e) => {

                })
            } catch (e) {

            }
        },
    }));

const useTestLogin = create((set) => ({
    enabled:false,
    getTestPermision: async ()=>{
        const {data} = await axios.get(`${url}/is-test-login`)
        set(()=>({
            enabled:data.response
        }))
    }
}))

export { useUpload, useTestLogin }
