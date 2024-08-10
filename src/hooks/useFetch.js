import { useState,useEffect } from "react";
import axios from "axios";


const useFetch=(url)=>{
    const [data,setData]=useState([])
    const [load,setLoad]=useState(false)
    const [error,setError]=useState(false)

    useEffect(
        ()=>{
            const fetchdata =async ()=>{
                try{
                    setLoad(true);
                    const fetch_data=await axios.get(url);
                    setData(fetch_data);
                    

                }
                catch(err){
                    setError(err);
                }
                setLoad(false);
            }
            fetchdata();

        }
    ,[url]);

    return {data,load,error};

};

export default useFetch;