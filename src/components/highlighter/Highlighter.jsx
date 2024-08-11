import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_KEY } from "../../config";
import "./highlighter.css";
import { UserContext } from "../../context/UserContext";

const Highlighter = () => {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(0);
    const { data, setUser } = useContext(UserContext);
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

    useEffect(() => {
        fetchImages(); // Initial fetch

        const pageInterval = setInterval(() => {
            if (page < images.length / imagesPerPage - 1) {
                setPage(prev => prev + 1);
            } else {
                fetchImages();
            }
        }, 10000);  // 10 seconds

        return () => clearInterval(pageInterval); // Clean up on component unmount
    }, []);

    return (
        <div className="highlighter">
            <div className="name">{data.name}</div>
            <div className="title">{data.title}</div>
            <div className="address">{data.address}</div>

            <div className="images-container">
                {images.map((url, index) => (
                    <img key={index} src={url} alt="Image"  />
                ))}
            </div>
        </div>
    );
};

export default Highlighter;

