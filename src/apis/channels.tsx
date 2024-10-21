import { http } from "@/utils";
import type { ResType } from "./shared";

//获取文章列表
type ChannelItem = {
    id: number,
    name: string
}
export type Channels = {
    channels: ChannelItem[]
}
export const channelGetListAPI = () => http.get<ResType<Channels>>('/channels')

//获取文章列表
type ResultsItem = {
    art_id: string,
    title: string,
    aut_id: string,
    comm_count: number,
    pubdate: string,
    aut_name: string,
    is_top: number,
    cover: {
        type: number,
        images: string[]
    }
}
export type ResList = {
    results: ResultsItem[]
    pre_timestamp: string
}

export type Parmes = {
    channel_id: string,
    timestamp: string
}

export const articleGetListAPI = (params: Parmes) => http.get<ResType<ResList>>('/articles', { params: params })