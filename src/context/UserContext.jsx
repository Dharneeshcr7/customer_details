import { createContext ,useEffect,useState} from "react";

const INIT_USER={
    name:"Random name",
    title:"Random Title",
    address:"Random Address",
    id:null,
}

export const UserContext=createContext();

export const UserContextProvider=({children})=>{
    const [user,setUser]=useState(INIT_USER);
    
    return(
        <UserContext.Provider value={{data:user,setUser}}>
        {children}
        </UserContext.Provider>
    )
};