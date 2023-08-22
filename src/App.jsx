import { useEffect, useRef, useState } from "react";
import { addDoc, collection, limit, orderBy, query, serverTimestamp, doc, deleteDoc, getFirestore, getDoc, getDocs, } from "firebase/firestore";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import "./App.css";
import { auth, databaseApp } from "./services/firebaseConfig";

export const App = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1>Chat</h1>
        <SingOut />
      </header>
      <section>{user ? <ChatRoom /> : <SingIn />}</section>
    </div>
  ); 
};

export const ChatRoom = () => {

  const dummy = useRef(); 
  const messagesRef = collection(databaseApp, "messages");

  const [messages, setMessage] = useState()

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(messagesRef);
    
      setMessage(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    };
    getUsers();
  });

  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <main> 
        {messages && 
        messages.map((msg, index)=> (
        <ChatMessage key={index} message={msg} />
        ))}
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}> 
        <input 
         type="text"
         value={formValue} onChange={(e) => setFormValue(e.target.value)} 
        />
        <button> enviar </button>
      </form>
    </>
  ); 
};

export const ChatMessage = (props) => {

  const messagesRef = collection(databaseApp, "messages");

  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  const deleteMessage = async (e) => {
    e.preventDefault();
    console.log(props.message)
    console.log(messagesRef)
    
    const messageRef = doc(databaseApp, "messages", props.message.id);
    await deleteDoc(messageRef);    
  }

  return (

    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="Avatar" />
      <p>{text}</p>
      <button onClick={deleteMessage}> x </button>
      

    </div>
  ); 
};


export const SingIn = () => {

  const [signInWithGoogle] = useSignInWithGoogle(auth);
  return (
    <button className="sign-In" onClick={() => signInWithGoogle()}> 
    Logar com Google 
    </button>
  ); 
};

export const SingOut = () => {

  return (

      auth.currentUser && (
        <button className="sing-out" onClick={() => auth.signOut()}> 
        Sair 
        </button>
      )
  ); 
};