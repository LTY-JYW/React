import { createBrowserRouter } from 'react-router-dom'
import List from '../pages/Home'
import Detail from '@/pages/Detail/index.tsx'
const router = createBrowserRouter([
    {
        path:'/',
        element:<List></List>
    },
    {
        path:'/detail',
        element:<Detail></Detail>
    }
])

export default router