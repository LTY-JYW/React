import { channelGetListAPI } from "@/apis/channels";
import { useEffect, useState } from "react";
import type { Channels } from "@/apis/channels";
function useTabs() {
    const [ channels, setChannels] = useState<Channels>()
    useEffect(()=>{
        const getList = async () => {
            try {
                const { data: { data } } = await channelGetListAPI()
            setChannels(data)
            } catch (error) {
                throw new Error('api channelGetListAPI Error')
            }
        }
        getList()
    },[])
    return{
        channels
    }
}


export {
    useTabs
}