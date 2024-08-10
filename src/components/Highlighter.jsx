import { useEffect } from "react"
import useFetch from "../hooks/useFetch"
import { isFocusable } from "@testing-library/user-event/dist/utils";
const Highlighter=(data)=>{
    const [images,setImages]=useState([]);
    useEffect(()=>{

        setTimeout(async()=>{
            cur_imgs=[]
            const {data,load,error}=useFetch('https://api.unsplash.com/');
            for(let i=0;i<9;i++){
                
                
            }
            setImages(cur_imgs)
        },10000)

       }
    );
    return(
        <div className="highlighter">
           <div className="name">{data.name}</div>
           <div className="title">{data.title}</div>


        </div>
    )
}