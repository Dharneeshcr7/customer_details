import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
const Card=(props)=>{
    console.log(props)
    const {data,setUser}=useContext(UserContext);
    const handleClick=()=>{
          setUser(props.data)
    }
    return(
        <div className={(props.data==data)?'highlighted':'normal'} onClick={handleClick}>
           <div className="name">{props.data.name}</div>
           <div className="title">{props.data.title}</div>
        </div>
    )

}

export default Card;