
import { useSelector } from 'react-redux';
import useTrailer from '../hooks/useTrailer';
const VidBG = ({ movieId }) => {

    
    // fetching the trailer video && updating the store with it
    const trailerVideo=useSelector((store) =>store.movies?.trailerVideo)
    useTrailer(movieId);

  return (
    <div className="w-screen">

        <iframe 
           className='w-screen aspect-video'
            src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?&autoplay=1&mute=1"} 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen>
        </iframe>

    </div>
  )
}

export default VidBG