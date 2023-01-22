import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuestionsForTopic } from "../actions/watson";

function Questions(props: any) {

  const { questions, fetchQuestionsForTopic } = props;
  const [questionList, setQuestionList] = useState([]);

  //questions in the redux store are the same, niceeee im fucked then. 

  //child question
  const selectQuestion = (e: any, question: any) => {
    e.preventDefault();
    return (props.clickQuestion(question));
  }
  useEffect(() => {
    console.log(props)
    setQuestionList(props.category.message.questions)
  }, [])

  // useEffect(() => {
  //   console.log(props.category.message.id)
  //   console.log(questions)
  //   console.log("FUCK")
  //   fetchQuestionsForTopic(props.category.message.id);
  // }, [])

  // useEffect(() => {

  //   if (questions != undefined && questions.length > 0) {
  //     setQuestionList(questions[0].questionList);
  //   }
  // }, [questions])

  //return questions for category 
  //pass selected category as id and name 
  //get questions for that category + display 

  return (
    <>
      <div>
        <strong>FAQ:
          {props.lang == "english"
            ? props.category.message.description
            : props.category.message.descriptionDutch}
        </strong>
        <hr />
        <> {questionList.map((question: any) => {
          return (
            <button onClickCapture={(e) => selectQuestion(e, question)}>
              Q:
              {props.lang == "english"
                ? question.questionText
                : question.questionTextDutch}
              <img className="arrow" src={require('../../img/arrow.png')} /></button>
          )
        }

        )}
        </>
      </div>
    </>

  );
}

const questionsMapStateToProps = (state: { watson: { questions: any } }) => ({
  questions: state.watson.questions

});
export default connect(questionsMapStateToProps, { fetchQuestionsForTopic })(Questions);


  // switch(props.lang) {
  //   case("english"):
  //     switch(props.category) {
  //       case 'password':
  //         return (
  //           <div>
  //               <strong>FAQ: Password</strong>
  //               <hr/>
  //               <button onClickCapture={(e) => question(e, "How can I reset my password?")}>Q: How can I reset my password? <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //           </div>
  //         );
  //       case 'office':
  //         return (
  //           <div>
  //              <strong> FAQ: Office 365</strong>
  //               <hr/>
  //               <button onClickCapture={(e) => question(e, "What is included in Office 365?")}>Q: What is included in Office 365? <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //               <button onClickCapture={(e) => question(e, "Can I get Office 365?")}>Q: Can I get Office 365? <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //               <button onClickCapture={(e) => question(e, "Can I add an email account?")}>Q: Can I add an email account? <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //               {/* <button onClickCapture={(e) => question(e, "How to enable presentation mode (PowerPoint)?")}>Q: How to enable presentation mode (PowerPoint)? <img className="arrow" src={require('../../img/arrow.png')} /></button> */}
  //               <button onClickCapture={(e) => question(e, "Other Office 365 questions.")}>Q: Other Office 365 questions. <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //           </div>
  //         );
  //       case 'equipment':
  //       return (
  //         <div>
  //          <strong>FAQ: Fontys Laptop</strong>
  //             <hr/>
  //             {/* <button onClickCapture={(e) => question(e, "I have direct access problems in the start up of the laptop.")}>Q: I have direct access problems in the start up of the laptop. <img className="arrow" src={require('../../img/arrow.png')} /></button> */}
  //             <button onClickCapture={(e) => question(e, "I have Battery, Sound or Camera issues.")}>Q: I have Battery, Sound or Camera issues. <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //         </div>
  //       );
  //       case 'wifi':
  //         return (
  //           <div>
  //          <strong>FAQ: WiFi</strong>
  //               <hr/>
  //               <button onClickCapture={(e) => question(e, "How to connect to eduroam (students)?")}>Q: How to connect to eduroam (students)? <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //               {/* <button onClickCapture={(e) => question(e, "How to connect to eduroam as a visitor (guest lecturer)?")}>Q: How to connect to eduroam as a visitor (guest lecturer)? <img className="arrow" src={require('../../img/arrow.png')} /></button> */}
  //           </div>
  //         );
  //       case 'media':
  //         return (
  //           <div>
  //               <strong>FAQ: Audio & Video</strong>
  //               <hr/>
  //               <button onClickCapture={(e) => question(e, "How to use the smart board?")}>Q: How to use the smart board? <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //           </div>
  //         );
  //       default:
  //         return(null);
  //     }
  //     case("dutch"):
  //     switch(props.category) {
  //       case 'password':
  //         return (
  //           <div>
  //             <strong>  FAQ: Wachtwoord</strong>
  //               <hr/>
  //               <button onClickCapture={(e) => question(e, "How kan ik mijn wachtwoord resetten?")}>Q: How kan ik mijn wachtwoord resetten? <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //           </div>
  //         );
  //       case 'office':
  //         return (
  //           <div>
  //            <strong>   FAQ: Office 365</strong>
  //               <hr/>
  //               <button onClickCapture={(e) => question(e, "Wat is inbegrepen bij Office 365?")}>Q: Wat is inbegrepen bij Office 365? <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //               <button onClickCapture={(e) => question(e, "Krijg ik Office 365?")}>Q: Krijg ik Office 365? <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //               <button onClickCapture={(e) => question(e, "Kan ik een email account toevoegen?")}>Q: Kan ik een email account toevoegen? <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //               {/* <button onClickCapture={(e) => question(e, "How to enable presentation mode (PowerPoint)?")}>Q: How to enable presentation mode (PowerPoint)? <img className="arrow" src={require('../../img/arrow.png')} /></button> */}
  //               <button onClickCapture={(e) => question(e, "Andere Office 365 vragen.")}>Q: Andere Office 365 vragen. <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //           </div>
  //         );
  //       case 'equipment':
  //       return (
  //         <div>
  //            <strong> FAQ: Fontys Laptop</strong>
  //             <hr/>
  //             {/* <button onClickCapture={(e) => question(e, "I have direct access problems in the start up of the laptop.")}>Q: I have direct access problems in the start up of the laptop. <img className="arrow" src={require('../../img/arrow.png')} /></button> */}
  //             <button onClickCapture={(e) => question(e, "Ik heb batterij, geluid of camera problemen.")}>Q: Ik heb batterij, geluid of camera problemen. <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //         </div>
  //       );
  //       case 'wifi':
  //         return (
  //           <div>
  //            <strong>   FAQ: WiFi </strong>
  //               <hr/>
  //               <button onClickCapture={(e) => question(e, "Hoe verbind ik met eduroam (studenten)?")}>Q: Hoe verbind ik met eduroam (studenten)? <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //               {/* <button onClickCapture={(e) => question(e, "How to connect to eduroam as a visitor (guest lecturer)?")}>Q: How to connect to eduroam as a visitor (guest lecturer)? <img className="arrow" src={require('../../img/arrow.png')} /></button> */}
  //           </div>
  //         );
  //       case 'media':
  //         return (
  //           <div>
  //              <strong> FAQ: Audio & Video </strong>
  //               <hr/>
  //               <button onClickCapture={(e) => question(e, "Hoe gebruik ik het smart board?")}>Q: Hoe gebruik ik het smart board? <img className="arrow" src={require('../../img/arrow.png')} /></button>
  //           </div>
  //         );
  //       default:
  //         return(null);
  //     }
  //   default:
  //     return(null);
  // }
