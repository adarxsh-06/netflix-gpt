

import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovies from "../hooks/usePopularMovies";
import Header from "./Header"

import PrimaryContainer from "./PrimaryContainer";
import SecContainer from "./SecContainer";
import GPTSearchPage from "./GPTSearchPage";

const Browse = () => {
  const showGptSearch = useSelector(store=>store.gpt.showGptSearch)
  // fetch data from, TMDB and update the store
  useNowPlayingMovies();
  usePopularMovies()
  return (
    <div>
      <Header />
      {showGptSearch ?
         (<GPTSearchPage/>): (
         <> 
            <PrimaryContainer/>
            <SecContainer/> 
         </> )
      
      }
        
    </div>
  )
}

export default Browse