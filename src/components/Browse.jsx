

import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovies from "../hooks/usePopularMovies";
import Header from "./Header"

import PrimaryContainer from "./PrimaryContainer";
import SecContainer from "./SecContainer";

const Browse = () => {
  // fetch data from, TMDB and update the store
  useNowPlayingMovies();
  usePopularMovies()
  return (
    <div>
      <Header />
      <PrimaryContainer/>
      <SecContainer/>
    </div>
  )
}

export default Browse