import Chatlist from "./ChatList/Chatlist.jsx"
import { useContext } from "react"
import "./List.css"

const List = () => {
    return(
        <div className ='list'><Chatlist/></div>
    )
}

export default List