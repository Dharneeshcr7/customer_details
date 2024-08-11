import "./list.css"
import Card from "../card/Card";
import { useState,useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import InfiniteScroll from 'react-infinite-scroll-component';
const List=()=>{
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [more,setMore]=useState(true);
    const fetchData=async ()=>{
        setIsLoading(true);
        try{     
            const res=await axios.get(`https://customer-details-9dgv.onrender.com/people?_page=${page}`);
            console.log(res.data)
            setItems(prev=>[...prev,...res.data.data])
            setPage(prev=>prev+1)
            
            setMore(res.data.data.length>0)
        }
        catch(err){
           setError(err)
        }
        finally{
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData();
      }, []);

    
    return(
        <div className="list">
         <InfiniteScroll
           dataLength={items.length}
           next={fetchData}
           hasMore={more}
           loader={<p>Loading....</p>}
           endMessage={<p>Reached end of data...</p>}
         >
         {items.map((item, index) => (
            <Card key={index} data={item} />
        ))}
         
         </InfiniteScroll>
        </div>
    )
}

export default List;