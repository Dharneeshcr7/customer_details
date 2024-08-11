import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { API_KEY } from "../../config";
import "./highlighter.css"
import { UserContext } from "../../context/UserContext";
const Highlighter = () => {
    const [images, setImages] = useState([]);
    
    const {data,setUser}=useContext(UserContext)
    const [page,setPage]=useState(0);
    const fetchImages = async () => {
        try {
            
            const res = await axios.get('https://api.unsplash.com/photos/random?count=90', {
                headers: {
                    'Authorization': `Client-ID ${API_KEY}`
                }
            });
            const cur_imgs = res.data.map((element) => element.urls.small);
            setImages(cur_imgs);
            setPage(0);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
       
        fetchImages();

        
        const interval = setInterval(() => {
            fetchImages();
        }, 100000);

        const interval2=setInterval(()=>{
            setPage(prev=>(prev+1));
        },10000)

        
        return () => {
            clearInterval(interval)
            clearInterval(interval2)
        };
    }, []); 

    return (
        <div className="highlighter">
            
            <div className="name">{data.name}</div>
            <div className="title">{data.title}</div>
            <div className="address">{data.address}</div>
            
            <div className="images-container">
                {images.slice(page*9,(page+1)*9).map((url, index) => (
                    <img key={index} src={url} alt="Rate limit exeeded" style={{ width: '200px', height: '200px' }} />
                ))}
            </div>
        </div>
    );
};

export default Highlighter;
