import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, or, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import "./addUser.css";
import { db } from "../../../../firebase";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import DefaultProf from '../../../../ProfilePics/defaultprofile.png';

const AddUser = () => {
    const [otherUser, setOtherUser] = useState(null);
    const [otherUsers, setOtherUsers] = useState(null);
    const [name, setName] = useState("");
    const [noResults, setNoResults] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;
    const [chatterProfilePicture, setChatterProfilePicture] = useState(DefaultProf);

    const handleSearch = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try{
            if(user){
                const userRef = collection(db, "users");
                const q = query(userRef, or(where("firstName", "==", username), where("displayName", "==", username)));
                //we dont actually have usernames so this is a temprary fix hopefully
                const querySnapshot = await getDocs(q);
                if(!querySnapshot.empty) {
                    const foundUsers = [];
                    querySnapshot.forEach((doc) =>{
                        console.log(doc.data());
                        const other = doc.data()
                        other.id = doc.id;
                        if(other.isDisabled != true){
                            setOtherUser(other);
                            setNoResults(false);
                            foundUsers.push(other);
                        }
                    });
                    setOtherUsers(foundUsers);
                    
                }else{setNoResults(true);}
            }
        }catch(err){console.log(err)}
    };

    const handleAdd = async (other)=>{
        try{
            if(user){
                const chatRef = collection(db,"chats");
                const userChatsRef = collection(db,"userchats");
                const newChatRef = doc(chatRef);

                await setDoc(newChatRef, {
                    createdAt: serverTimestamp(),
                    messages:[],
                });

                await updateDoc(doc(userChatsRef, other.id), {
                    chats:arrayUnion({
                        chatId: newChatRef.id,
                        lastMessage:"",
                        receiverId: user.uid,
                        updatedAt: Date.now()
                    }),
                });

                await updateDoc(doc(userChatsRef, user.uid),{
                    chats:arrayUnion({
                        chatId: newChatRef.id,
                        lastMessage:"",
                        receiverId: other.id,
                        updatedAt: Date.now()
                    }),
                });
            }
        }catch(err){console.log(err);}
    };

    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username"/>
                <button type="submit">Search</button>
            </form>
            {noResults && <span>No user found.</span>}
            {otherUser && <div>
                {otherUsers?.map((other) => (
                    <div className="user" key={other.id}>
                        <div className="detail">
                            <img src={other.profilePicture || chatterProfilePicture} alt="" />
                            <span>{other.firstName} {other.lastName}</span>
                        </div>
                        <button onClick={()=>handleAdd(other)}>Add User</button>
                </div>
                ))}
            </div>}
        </div>
    );
}

export default AddUser;