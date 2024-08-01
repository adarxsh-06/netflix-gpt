import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/Validate"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,} from "firebase/auth";
import {auth} from "../utils/firebase"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { AVATAR, BG_IMAGE } from "../utils/constants";

const Login = () => {
  
  const dispatch=useDispatch();

  const [isSignInForm,setIsSignForm]=useState(true)
  const [errMessage,setErrMessage] = useState(null)

  const email=useRef(null)
  const name=useRef(null)
  const password=useRef(null)
  
  const handleButtonClick = () => {
    //  validate the form data
   const message=checkValidData(email.current.value,password.current.value)
   setErrMessage(message)
   
   if(message)return ;

   // sign in or sign up logic here
   if(!isSignInForm){

      // sign up logic

      createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
         
          updateProfile(user, {
            displayName:name.current.value, photoURL: AVATAR,
          }).then(() => {
            // Profile updated!
            const {uid,email,displayName,photoURL} = auth.currentUser;

            dispatch(addUser({uid:uid , email:email , displayName:displayName , photoURL:photoURL}));

          }).catch((error) => {
            // An error occurred
           setErrMessage(error.message)
          });
         

      })
      .catch((error) => {
           const errorCode = error.code;
          const errorMessage = error.message;
           setErrMessage(errorCode + "-" + errorMessage)
  
      });

    }

    else {
      // sign in logic
        
      signInWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then(() => {
         // Signed in 
          // const user = userCredential.user;
          
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage)
      });

    }

  }

  const toggleSignInForm=()=>{
    setIsSignForm(!isSignInForm)
  }
  return (
    <div>
      <Header/>
      <div className="absolute">
        <img src={BG_IMAGE}
           alt="Logo"
        />
      </div>

      <form onSubmit={(e)=>e.preventDefault()} className="absolute p-6 bg-black my-36 mx-auto w-3/12 left-0 right-0 text-white rounded-lg opacity-75">

        <h1 className="font-bold text-3xl py-6">
          {isSignInForm ? "Sign In" : "Sign Up" }
        </h1>

        {!isSignInForm &&
          <input ref={name} type="text" placeholder="Full Name" className="p-2 my-4 w-full rounded-lg bg-gray-700"/>
        }

        <input ref={email} type="text" placeholder="Email" className="p-2 my-4 w-full rounded-lg bg-gray-700"/>

        <input ref={password}  type="password" placeholder="Password" className="p-2 my-4 w-full rounded-lg bg-gray-700"/>
         
         <p className="text-red-500 font-bold text-lg py-2">{errMessage}</p>

        <button className="p-4 my-6 bg-red-600 w-full rounded-lg" onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up" }
        </button>

        <div>
          <a href="#">Forgot Password?</a>
        </div>

        <div>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm ? "New to Netflix ? Sign Up Now" : "Already a User? Sign In Now" }
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login