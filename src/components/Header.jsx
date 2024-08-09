import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser,removeUser} from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate=useNavigate();
  const user=useSelector((store)=>store.user);
  const dispatch=useDispatch();
  
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch)

  const handleSignOut=()=>{
    signOut(auth)
      .then(()=>{})
      .catch(()=>{
        navigate("/error")
      })
  }

  // adding userData to redux store
  useEffect(()=>{

    //  this below api is provided by firebase=>it is kind of a eventlistener 
    // which will be called whenever user's auth state is changed that is whenever user is signing up or signing out or signing in

    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signing in or signing up=>add User data to store
        // https://firebase.google.com/docs/reference/js/auth.user

        const {uid,email,displayName,photoURL} = user;

        dispatch(addUser({uid:uid , email:email , displayName:displayName , photoURL:photoURL}));
        navigate("/browse") // navigate to browse page after successful login

      } else {
        // User is signing out=>remove data from the redux store
         dispatch(removeUser())
         navigate("/") // navigate to login page or main page after successful logout
      }
    });

    // when the header component will unmount/unload this following function will unsubscribe to this API(onAuthStateChanged)(or kind of event listener))
    return ()=>unsubscribe();
  },[])

  const handleGptSearch = ()=>{
       dispatch(toggleGptSearchView());
  }

  const handleLangChange = (e) =>{
     dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img  
        className="w-44" 
        src={LOGO}
        alt="Logo"
        />
        {user &&
           (
          <div className="flex p-2 m-4">
            <select className="p-2 m-2 bg-gray-800 text-white" onChange={handleLangChange}>
               {SUPPORTED_LANGUAGES.map((lang)=>( <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>))}
            </select>
            
            <button onClick={handleGptSearch} className="mx-4 font-bold rounded-md p-2 bg-green-400 text-white hover:bg-green-600">
            {showGptSearch?"Home Page":"GPT Search"}
            </button>
            <img className="w-12 h-12 " alt="userIcon" src={user?.photoURL}/>
            <button onClick={handleSignOut} className="mx-4 font-bold rounded-md p-2 bg-purple-400 text-white hover:bg-purple-600">
               Sign Out
            </button>

          </div>
        )}
    </div>
  )
}

export default Header