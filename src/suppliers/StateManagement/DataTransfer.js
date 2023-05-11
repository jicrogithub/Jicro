import { create } from 'zustand';

const useData = create(
    (set) => ({
        data:{},
        shouldRedirect:false,
        setData:(data)=>{
            set(()=>({
                data:data,
            }))
        },
        setRedirect:(should)=>{
            set(()=>({
                shouldRedirect:should
            }))
        }
    }));

export { useData }
