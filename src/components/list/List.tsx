import "./list.css"
import Card from "../card/Card";
import { useState,useEffect,useCallback,useRef } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
// import InfiniteScroll from 'react-infinite-scroll-component';
import useBookSearch from "../../hooks/usePaginate";
const List=()=>{
    
    const [page, setPage] = useState(1);
    
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
    
    
    return(
        <div className="max-h-[400px] overflow-y-auto border border-gray-300 p-4">
        
        {books.map((book, index) => (
          <Card
              key={book.id} 
              data={book}
              ref={books.length === index + 1 ? lastBookElementRef : null}
          />
      ))}

      {(books.length==0) && 
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
       }
         
         
        </div>
    )
}

export default List;