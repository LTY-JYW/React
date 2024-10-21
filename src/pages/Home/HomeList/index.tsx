import { Image, List, InfiniteScroll } from 'antd-mobile'
import { articleGetListAPI } from "@/apis/channels";
import { useEffect, useState } from "react";
import type { ResList } from "@/apis/channels";
import { useNavigate } from 'react-router-dom';
type Id = {
  channelId: string
}
const HomeList = (props: Id) => {
  //加载数据
  const { channelId } = props
  const [articleList, setArticleList] = useState<ResList>({
    results: [],
    pre_timestamp: '' + new Date().getTime(),
  })
  useEffect(() => {
    const getList = async () => {
      try {
        const { data: { data } } = await articleGetListAPI({
          channel_id: channelId,
          timestamp: '' + new Date().getTime(),
        })
        setArticleList(data)
      } catch (error) {
        throw new Error('List Get Error')
      }
    }
    getList()
  }, [channelId])

  //上拉加载
  const [hasMore, setHasMore] = useState(true)
  const loadMore = async () => {
    try {
      const { data: { data } } = await articleGetListAPI({
        channel_id: channelId,
        timestamp: '' + articleList?.pre_timestamp
      })
      //没有数据停止下拉
      if (data.results.length === 0) {
        setHasMore(false)
      }
      //拼接数据
      setArticleList({
        results: [...articleList.results, ...data.results],
        pre_timestamp: data.pre_timestamp
      })
    } catch (error) {
      throw new Error('loadMore Error')
    }
  }

  //跳转详情页
  const navigate = useNavigate()
  const goToDetail = (art_id:string) => {
    navigate(`/detail?id=${art_id}`)
  }
  return (
    <>
      <List>
        {articleList?.results.map((item) => (
          <List.Item
            key={item.art_id}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
                onClick={() => goToDetail(item.art_id)}
              />
            }
            description={item.pubdate}
          >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10} />
    </>
  )
}

export default HomeList