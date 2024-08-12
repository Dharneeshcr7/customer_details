import { useContext,forwardRef } from "react";
import { UserContext } from "../../context/UserContext";
import "./card.css"
const Card=forwardRef((props,ref)=>{
    //console.log(props)
    const {data,setUser}=useContext(UserContext);
    const handleClick=()=>{
          setUser(props.data)
    }
    return(
        <div className={`card ${(props.data.id==data.id)?'highlight':'normal'}`} ref={ref} onClick={handleClick}>
           <div className="name">{props.data.name}</div>
           <div className="title">{props.data.title}</div>
        </div>
    )

});

export default Card;