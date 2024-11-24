import "./Detail.css"

const Detail = () => {
    return(
        <div className ='detail'>
            <div className="user">
                <img src="./491-senior-project\src\ProfilePics\defaultprofile.png" alt=""/>
                <h2>Username</h2>
                <p>user description</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                    </div>
                </div>
                <button> Block User</button>
            </div>
        </div>
    )
}

export default Detail