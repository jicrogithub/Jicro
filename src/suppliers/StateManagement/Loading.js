import { create } from 'zustand';

const useLoading = create(
    (set) => ({
        loading:false,
        setLoading:(bool)=>{
            set(()=>({
                loading:bool
            }))
        }
    }));

export { useLoading }
