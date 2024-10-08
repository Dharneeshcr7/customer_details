import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_KEY } from "../../config";
import "./highlighter.css";
import { UserContext } from "../../context/UserContext";

const Highlighter = () => {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(0);
    const { data, setUser } = useContext(UserContext);
    const IMG_SIZE=27
    const imagesPerPage = 9;
    

    const fetchImages = async () => {
        try {
            const res = await axios.get('https://api.unsplash.com/photos/random?count=27', {
                headers: {
                    'Authorization': `Client-ID ${API_KEY}`
                }
            });
            const cur_imgs = res.data.map((element) => element.urls.small);
            setImages(cur_imgs);
            setPage(0);  // Reset page to 0 with each new fetch
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };
    const chechFetch=()=>{
        console.log(page,images.length)
        if (page < IMG_SIZE/imagesPerPage-1) {
            setPage(prev => (prev + 1));
        } else {
            fetchImages();
        }
    }

    useEffect(()=>{
        fetchImages();
    },[])

    useEffect(() => {
        //fetchImages(); // Initial fetch

        const pageTimeout = setTimeout(() => {
            chechFetch();
        }, 10000);  // 10 seconds

        return () => clearInterval(pageTimeout); // Clean up on component unmount
    }, [page]);

    return (
        <div className="highlighter">
            <div className="name">{data.name}</div>
            <div className="title">{data.title}</div>
            <div className="address">{data.address}</div>

            <div className="images-container">
                {images.slice(page*9,(page+1)*9).map((url, index) => (
                    <img key={index} src={url} alt="Image"  />
                ))}
            </div>
        </div>
    );
};

export default Highlighter;

