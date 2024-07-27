import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/Validate"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../utils/firebase"

const Login = () => {
  const [isSignInForm,setIsSignForm]=useState(true)
  const [errMessage,setErrMessage] = useState(null)
  const email=useRef(null)
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
          console.log(user)

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
      .then((userCredential) => {
         // Signed in 
          const user = userCredential.user;
          console.log(user)
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
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_small.jpg"
           alt="Logo"
        />
      </div>

      <form onSubmit={(e)=>e.preventDefault()} className="absolute p-6 bg-black my-36 mx-auto w-3/12 left-0 right-0 text-white rounded-lg opacity-75">

        <h1 className="font-bold text-3xl py-6">
          {isSignInForm ? "Sign In" : "Sign Up" }
        </h1>

        {!isSignInForm &&
          <input type="text" placeholder="Full Name" required className="p-2 my-4 w-full rounded-lg bg-gray-700"/>
        }

        <input ref={email} type="email" placeholder="Email" required className="p-2 my-4 w-full rounded-lg bg-gray-700"/>

        <input ref={password}  type="password" placeholder="Password" required className="p-2 my-4 w-full rounded-lg bg-gray-700"/>
         
         <p className="text-red-500 font-bold text-lg py-2">{errMessage}</p>

        <button type="submit" className="p-4 my-6 bg-red-600 w-full rounded-lg" onClick={handleButtonClick}>
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