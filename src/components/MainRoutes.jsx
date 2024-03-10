import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { SinglePage } from "../pages/SinglePage"

export const MainRoutes=()=>{
    return(
     
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/singlecoin/:id" element={<SinglePage/>}/>
        </Routes>
        
      
    )
}