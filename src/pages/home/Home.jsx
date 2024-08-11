import Highlighter from "../../components/highlighter/Highlighter";
import List from "../../components/list/List";
import { useState,useEffect,useContext } from "react";
import "./home.css"
import { UserContext } from "../../context/UserContext";
import axios from "axios";
const Home=()=>{
    
    const {data,setUser}=useContext(UserContext);
    const getInit=async()=>{
        const res=await axios.get(`https://customer-details-9dgv.onrender.com/people?_page=1`)
        console.log(res)
        setUser(res.data.data[0]);

    }
    useEffect(()=>{
        getInit()

    }    
    ,[])
    return(
        <div className="home">
           <div  className="list"><List /></div>
           
           <div className="highlighter">
              <Highlighter/>
           </div>

           
           
        </div>
    )
}

export default Home;