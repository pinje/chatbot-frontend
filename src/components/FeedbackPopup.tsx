import '../components/FeedbackPopup.css';
import StarRatings from 'react-star-ratings'
import { useState } from 'react';
import { popupState } from '../models/popupState';
import { storeConveration } from './actions/watson';

function FeedbackPopup(props: popupState, ) {

    const [rating, setRating] = useState(0);

    const submitFeedback = () => {
        storeConveration([{type:"botLink",message:"h"},{type:"botLink",message:"h"}], 5); 
    }

    return (
        <div className='feedback-box'>
            <div className='title'>HOW WAS THE EXPERIENCE?</div>
            <div className='star-rating'>
                <StarRatings 
                rating={rating}
                starRatedColor="orange"
                numberOfStars={5}
                starDimension={"20"}
                changeRating={setRating}
                starHoverColor="purple"
                name='rating'/>
            </div>
            <div className='notice'>
                By answering this, the chat logs will be stored into our database
            </div>
            <div>
                <button onClick={() => props.setIsOpen(false)} className='return-button'>return</button>
                <button onClick={() => submitFeedback()} className='submit-button'>submit</button>
            </div>
        </div>
    )
}

export default FeedbackPopup;
