import { useSelector } from "react-redux"
import VidBG from "./VidBG"
import VideoTitle from "./VideoTitle"


const PrimaryContainer = () => {
    const movies=useSelector((store)=>store.movies?.nowPlayingMovies)
    if(!movies)return;

    const mainMovie=movies[Math.floor(Math.random()*(19-0)+0)];
    // console.log(mainMovie);

    const {original_title,overview,id}=mainMovie;
    // console.log(original_title);
    // console.log(id);
  return (
    <div className="pt-[30%] bg-black md:pt-0">
       
        <VideoTitle title={original_title} overview={overview}/>
        <VidBG movieId={id}/>
       
    </div>
  )
}

export default PrimaryContainer