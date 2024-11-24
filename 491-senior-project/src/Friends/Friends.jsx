import React, { useEffect, useState } from 'react';
import { collection, query, doc, getDocs, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import './Friends.css';

const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [emails, setEmails] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [requests, setRequests] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const auth = getAuth();
    const user = auth.currentUser;

    // Update Friend List
    const updateFriendList = (docs) => {
        const friendList = [];
        const emailList = [];
        docs.forEach((doc) => {
            const friend = doc.data();
            friendList.push({ ...friend, id: doc.id });
            emailList.push(friend.email);
        });
        setFriends(friendList);
        setEmails(emailList);
    };

    // Update Suggestions
    const updateSuggestions = (docs) => {
        const suggestionsList = [];
        docs.forEach((doc) => {
            const docEntry = doc.data();
            const element = document.getElementById(docEntry.email);
            if (!element) {
                suggestionsList.push({ ...docEntry, id: doc.id });
            }
        });
        setSuggestions(suggestionsList);
    };

    // Update Requests
    const updateRequests = (docs) => {
        const requestsList = [];
        docs.forEach((doc) => {
            const request = doc.data();
            requestsList.push({ ...request, id: doc.id });
        });
        setRequests(requestsList);
    };

    const sendFriendRequest = async (recipientId) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                console.error("User is not authenticated");
                return;
            }
    
            // Send friend request: Add request to the recipient's friend request collection
            const friendRequestRef = collection(db, "users", recipientId, "friendRequests");
            await addDoc(friendRequestRef, {
                senderId: user.uid,
                timestamp: new Date(),
            });
    
            console.log("Friend request sent successfully!");
    
            // Now add a notification for the recipient about the new friend request
            const notificationRef = collection(db, "users", recipientId, "notifications");
            await addDoc(notificationRef, {
                message: `${user.displayName} sent you a friend request.`,
                timestamp: new Date(),
                read: false,
                type: "friend_request", // Optional: Type of notification to distinguish from other notifications
            });
    
            console.log("Friend request notification added to recipient's notifications");
        } catch (error) {
            console.error("Error sending friend request or notification:", error);
        }
    };
    
    

    const addNotification = async (userId, message) => {
        try {
            const notificationsRef = collection(db, 'users', userId, 'notifications');
            // Add the notification document
            await addDoc(notificationsRef, {
                message: message,
                read: false, // Mark notification as unread by default
                timestamp: new Date(), // Store the current timestamp
                type: 'friend_request', // Optional: Tag for notification type
            });
            console.log("Notification added for user:", userId);
        } catch (error) {
            console.error("Error adding notification: ", error);
        }
    };
    
    

    // Accept Friend Request
    const acceptFriendRequest = async (friend) => {
        try {
            if (user) {
                const friendRef = doc(db, "users", user.uid, "friendlist", friend.id);
                const userDoc = { firstName: friend.firstName, lastName: friend.lastName, email: friend.email };
                await setDoc(friendRef, userDoc);

                const userRef = doc(db, "users", friend.id, "friendlist", user.uid);
                const friendDoc = { firstName: userData.firstName, lastName: userData.lastName, email: userData.email };
                await setDoc(userRef, friendDoc);

                const notifRef = doc(db, "users", friend.id, "notifications", user.uid);
                const notification = {
                    type: "friend_accept",
                    message: `${userData.firstName} ${userData.lastName} accepted your friend request.`,
                    timestamp: new Date(),
                    fromUserId: user.uid,
                };
                await setDoc(notifRef, notification);
            }
        } catch (err) {
            console.error("Error accepting friend request:", err);
        } finally {
            clearFriendRequest(friend.email, friend.id);
            fetchFriendsList(user.uid);
        }
    };

    // Clear Friend Request
    const clearFriendRequest = async (email, id) => {
        try {
            if (user) {
                const reqRef = doc(db, "users", user.uid, "friendrequests", id);
                await deleteDoc(reqRef);
                document.getElementById(email).style.display = 'none';
            }
        } catch (err) {
            console.error("Error clearing friend request:", err);
        }
    };

    // Fetch Friends List
    const fetchFriendsList = async (id) => {
        setError(null);
        setLoading(true);
        try {
            if (user) {
                const usersList = collection(db, "users", id, "friendlist");
                const userFriendsList = query(usersList);
                const querySnapshot = await getDocs(userFriendsList);
                updateFriendList(querySnapshot);
            }
        } catch (err) {
            console.error("Error loading user list:", err);
            setError("Error loading user list.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch Incoming Requests
    const fetchIncomingRequests = async () => {
        try {
            if (user) {
                const requestsRef = collection(db, "users", user.uid, "friendrequests");
                const incomingRequestsQuery = query(requestsRef);
                const querySnapshot = await getDocs(incomingRequestsQuery);
                updateRequests(querySnapshot);
            }
        } catch (err) {
            console.error("Error fetching incoming requests:", err);
        }
    };

    // Fetch User Data
    const fetchUserData = async () => {
        try {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
    };

    // Fetch Friend Suggestions
    const fetchFriendSuggestions = async () => {
        try {
            const usersRef = collection(db, "users");
            const allUsers = await getDocs(usersRef);
            updateSuggestions(allUsers);
        } catch (err) {
            console.error("Error fetching friend suggestions:", err);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserData();
            fetchFriendsList(user.uid);
            fetchIncomingRequests();
            fetchFriendSuggestions();
        }
    }, [user]);

    if (error) return <p>{error}</p>;
    if (!user) return <p>No user data available</p>;

    return (
        <section className='friendsList'>
            <div>
                <h2>Friends</h2>
                <div id='friendDisplay'>
                    <p>Welcome to the friend zone</p>
                    {loading && "Loading..."}
                    <ul className='list'>
                        {friends?.map((friend) => (
                            <li key={friend.id} className='listElement'>
                                {friend.firstName} {friend.lastName}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Friend Suggestions */}
                <div>
                    <h3>Friend Suggestions</h3>
                    <ul className='suggestionsList'>
                        {suggestions?.map((friend) => (
                            <li key={friend.id} className='suggestionElement'>
                                {friend.firstName} {friend.lastName}
                                <button onClick={() => sendFriendRequest(friend.id)}>Add Friend</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Friend Requests */}
                <div>
                    <h3>Friend Requests</h3>
                    <ul className='requestsList'>
                        {requests?.map((request) => (
                            <li key={request.id} className='requestElement'>
                                {request.firstName} {request.lastName}
                                <button onClick={() => acceptFriendRequest(request)}>Accept</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Friends;
