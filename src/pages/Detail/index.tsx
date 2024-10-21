import { articleInfoAPI } from "@/apis/articles"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ArticleDataType } from "@/apis/articles"
import { NavBar } from "antd-mobile"
const Detail = () => {
    const navigator = useNavigate()
    const [ params ] = useSearchParams()
    const id = params.get('id')
    const [ infoList, setinfoList ] = useState<ArticleDataType>()
    useEffect(()=>{
        const getInfo = async () => {
            const { data:{ data } } = await articleInfoAPI(id!)
            setinfoList(data)
        }
        getInfo()
    },[id])

    if(!infoList){
        return <div>Loading ...</div>
    }
    const back = () => {
        navigator(-1)
    }

    return (
        <div>
      <NavBar onBack={back}>{infoList.title}</NavBar>
      <div dangerouslySetInnerHTML={{ __html: infoList.content }}></div>
    </div>
    )
}

export default Detail