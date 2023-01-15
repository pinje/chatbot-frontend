import '../components/FeedbackPopup.css';
import StarRatings from 'react-star-ratings'
import { useState } from 'react';
import { storeConveration } from './actions/watson';
import { connect } from "react-redux";
import { clearStore } from "./actions/watson";
import store from "../store";

const FeedbackPopup = (props:any) => {
    const { chat, storeConveration } = props;

    const [rating, setRating] = useState(0);

    const submitFeedback = () => {
        storeConveration(chat, rating);
        props.chatIsOpen(false);
        store.dispatch(clearStore());     
    }

    return (
        <div className='feedback-box'>
            <div className='title'>HOW WOULD YOU RATE <br/> THE EXPERIENCE?</div>
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
                Your feedback will help us to improve our service. 
            </div>
            <div>
                <button onClick={() => submitFeedback()} className='submit-button'>submit</button>
                <button onClick={() => props.setIsOpen(false)} className='return-button'>return</button>
            </div>
        </div>
    )
}

const feedbackMapStateToProps = (state: { watson: {messages: any} }) => ({
    chat: state.watson.messages
});
  
export default connect(feedbackMapStateToProps, {storeConveration})(FeedbackPopup);
