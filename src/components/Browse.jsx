

import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import Header from "./Header"

import PrimaryContainer from "./PrimaryContainer";
import SecContainer from "./SecContainer";

const Browse = () => {
  // fetch data from, TMDB and update the store
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <PrimaryContainer/>
      <SecContainer/>
    </div>
  )
}

export default Browse