import "./list.css"
import Card from "../card/Card";
import { useState,useEffect,useCallback,useRef } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
// import InfiniteScroll from 'react-infinite-scroll-component';
import useBookSearch from "../../hooks/usePaginate";
const List=()=>{
    // const [items, setItems] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // //const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    // const [more,setMore]=useState(true);
    const {
        books,
        hasMore,
        loading,
        error
      } = useBookSearch(page)
      const observer = useRef()
      const lastBookElementRef = useCallback(node => {
        
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPage(prevPageNumber => prevPageNumber + 1)
          }
        })
        if (node) observer.current.observe(node)
      }, [loading, hasMore])
    
      
    // const fetchData=async ()=>{
    //     setIsLoading(true);
    //     try{     
    //         const res=await axios.get(`https://customer-details-9dgv.onrender.com/people?_page=${page}`);
    //         console.log(res.data)
    //         setItems(prev=>[...prev,...res.data.data])
    //         setPage(prev=>prev+1)
            
    //         setMore(res.data.data.length>0)
    //     }
    //     catch(err){
    //        setError(err)
    //     }
    //     finally{
    //         setIsLoading(false)
    //     }
    // }
    // useEffect(() => {
    //     fetchData();
    //   }, []);

    
    return(
        <div className="max-h-[400px] overflow-y-auto border border-gray-300 p-4">
        
        {books.map((book, index) => (
            <Card
                key={book.id} // Use a unique key (assuming `id` is unique)
                data={book}
                ref={books.length === index + 1 ? lastBookElementRef : null}
            />
        ))}
         
         
        </div>
    )
}

export default List;