import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_KEY } from "../../config";
import "./highlighter.css"
import { UserContext } from "../../context/UserContext";
const Highlighter = () => {
    const [images, setImages] = useState([]);
    const {data,setUser}=useContext(UserContext)
    const fetchImages = async () => {
        try {
            
            const res = await axios.get('https://api.unsplash.com/photos/random?count=9', {
                headers: {
                    'Authorization': `Client-ID ${API_KEY}`
                }
            });
            const cur_imgs = res.data.map((element) => element.urls.small);
            setImages(cur_imgs);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
       
        fetchImages();

        
        const interval = setInterval(() => {
            fetchImages();
        }, 10000);

        
        return () => clearInterval(interval);
    }, []); 

    return (
        <div className="highlighter">
            
            <div className="name">{data.name}</div>
            <div className="title">{data.title}</div>
            <div className="address">{data.address}</div>
            
            <div className="images-container">
                {images.map((url, index) => (
                    <img key={index} src={url} alt="Rate limit exeeded" style={{ width: '200px', height: '200px' }} />
                ))}
            </div>
        </div>
    );
};

export default Highlighter;
