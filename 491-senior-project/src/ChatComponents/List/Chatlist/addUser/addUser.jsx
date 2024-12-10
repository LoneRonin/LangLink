import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import "./addUser.css";
import { db } from "../../../../firebase";
import { getAuth } from "firebase/auth";
import { useState } from "react";

const AddUser = () => {
    const [otherUser, setOtherUser] = useState(null);
    const [name, setName] = useState("");
    const [noResults, setNoResults] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;

    const handleSearch = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try{
            if(user){
                const userRef = collection(db, "users");
                const q = query(userRef, where("firstName", "==", username));
                //we dont actually have usernames so this is a temprary fix hopefully
                const querySnapshot = await getDocs(q);
                if(!querySnapshot.empty) {
                    /*querySnapshot.forEach((doc) =>{
                        console.log(doc.data());
                    });*/
                    const other = querySnapshot.docs[0].data()
                    other.id = querySnapshot.docs[0].id;
                    setOtherUser(other);
                }
            }
        }catch(err){console.log(err)}
    };

    const handleAdd = async ()=>{
        try{
            if(user){
                const chatRef = collection(db,"chats");
                const userChatsRef = collection(db,"userchats");
                const newChatRef = doc(chatRef);

                await setDoc(newChatRef, {
                    createdAt: serverTimestamp(),
                    messages:[],
                });

                await setDoc(doc(userChatsRef, otherUser.id), {
                    chats:arrayUnion({
                        chatId: newChatRef.id,
                        lastMessage:"",
                        receiverId: user.uid,
                        updatedAt: Date.now()
                    }),
                });

                await setDoc(doc(userChatsRef, user.uid),{
                    chats:arrayUnion({
                        chatId: newChatRef.id,
                        lastMessage:"",
                        receiverId: otherUser.id,
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
            {otherUser && <div className="user">
                <div className="detail">
                    <img src={otherUser.profilePicture || "./defaultProfile.png"} alt="" />
                    <span>{otherUser.firstName} {otherUser.lastName}</span>
                </div>
                <button onClick={handleAdd}>Add User</button>
            </div>}
        </div>
    );
}

export default AddUser;