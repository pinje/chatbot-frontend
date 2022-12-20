import '../components/FeedbackPopup.css';
import StarRatings from 'react-star-ratings'
import { useState } from 'react';
import { storeConveration } from './actions/watson';
import { connect } from "react-redux";
import { popupState } from '../models/popupState';

const FeedbackPopup = (props:any, setIsOpen:popupState) => {
    const { chat, storeConveration } = props;

    const [rating, setRating] = useState(0);

    const submitFeedback = () => {
        console.log("wasup")
        console.log(rating)
        console.log(chat)
        storeConveration(chat, rating);
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
                    name='rating' />
            </div>
            <div className='notice'>
                By answering this, the chat logs will be stored into our database
            </div>
            <div>
                <button onClick={() => setIsOpen.setIsOpen(false)} className='return-button'>return</button>
                <button onClick={() => submitFeedback()} className='submit-button'>submit</button>
            </div>
        </div>
    )
}

const feedbackMapStateToProps = (state: { watson: {messages: any} }) => ({
    chat: state.watson.messages
});
  
export default connect(feedbackMapStateToProps, {storeConveration})(FeedbackPopup);
