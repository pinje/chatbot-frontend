import '../components/FeedbackPopup.css';
import StarRatings from 'react-star-ratings'
import { useState } from 'react';
import { storeConveration } from './actions/watson';
import { connect } from "react-redux";
import { Checkbox } from "@mui/material";
import { clearStore } from "./actions/watson";
import store from "../store";
import { check } from 'yargs';

const FeedbackPopup = (props:any) => {
    const { chat, storeConveration, lang } = props;

    const [rating, setRating] = useState(0);
    const [checked, setChecked] = useState(false);

    const submitFeedback = () => {
        if (checked) {
            // checked, store both conversation and rating
            storeConveration(chat, rating);
            props.chatIsOpen(false);
            store.dispatch(clearStore()); 
        } else {
            // not checked, store only rating
            storeConveration([], rating);
            props.chatIsOpen(false);
            store.dispatch(clearStore()); 
        }    
    }

    return (
        lang == 'english' ? 
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
                <Checkbox checked={checked} onChange={() => {setChecked(!checked)}}/>
                <div>"I want our conversation to be saved and used to improve the chat bot."</div>
            </div>
            <div>
                <button onClick={() => submitFeedback()} className='submit-button'>submit</button>
                <button onClick={() => props.setIsOpen(false)} className='return-button'>return</button>
            </div>
        </div> : <div className='feedback-box'>
            <div className='title'>HOE ZOU U UW ERVARING <br/> BEOORDELEN?</div>
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
                <Checkbox />
                <div>"Ik wil dat mijn gesprek wordt opgeslagen en gebruikt om de chat bot te verbeteren."</div>
            </div>
            <div>
                <button onClick={() => submitFeedback()} className='submit-button'>verstuur</button>
                <button onClick={() => props.setIsOpen(false)} className='return-button'>terug</button>
            </div>
        </div>
    )
}

const feedbackMapStateToProps = (state: { watson: { messages: any, language: any } }) => ({
    chat: state.watson.messages,
    lang: state.watson.language
});
  
export default connect(feedbackMapStateToProps, {storeConveration})(FeedbackPopup);
