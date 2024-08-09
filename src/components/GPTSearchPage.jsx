
import GPTSuggestions from './GPTSuggestions'
import GPTSearchBar from './GPTSearchBar'
import { BG_IMAGE } from '../utils/constants'


const GPTSearchPage = () => {
  return (
    <div>
      <div className="absolute -z-10">
            <img src={BG_IMAGE}
              alt="Logo"
            />
         </div>
         <GPTSearchBar/>
         <GPTSuggestions/>
    </div>
  )
}

export default GPTSearchPage