import { create } from 'zustand';
import axios from "axios"
const url = "http://192.168.50.205:8080"
const useUpload = create(
    (set) => ({
        uri: "",
        imageFor:"",
        upload: async (file,imageFor) => {
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
                    // console.log(e.data)
                    set(()=>({
                        uri:e.data.result,
                        imageFor:imageFor
                    }))
                }).catch((e) => {
                    console.log(e)
                })
            } catch (e) {
                console.log(e)
            }
        },
    }));

export { useUpload }
