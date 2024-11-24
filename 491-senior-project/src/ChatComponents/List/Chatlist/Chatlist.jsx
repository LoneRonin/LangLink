import "./Chatlist.css"

const Chatlist = () => {
    return(
        <div className ='chatlist'>
            <div className="search">
                <div className="searchbar">
                    <input type="text" placeholder="Search" />
                </div>
                <button className="add">+</button>
            </div>
            <div className="item">
                <img src="./defaultprofile.png" alt="" />
                <div className="texts">
                    <span>other user</span>
                    <p>hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./defaultprofile.png" alt="" />
                <div className="texts">
                    <span>other user</span>
                    <p>hello</p>
                </div>
            </div>
            
        </div>
    )
}

export default Chatlist