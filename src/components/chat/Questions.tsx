import { useState } from "react";
import { useEffect } from "react";

function Questions(props: any) {
  const [questionList, setQuestionList] = useState([]);

  const selectQuestion = (e: any, question: any) => {
    e.preventDefault();
    return (props.clickQuestion(question));
  }
  useEffect(() => {
    console.log(props)
    setQuestionList(props.category.message.questions)
  }, [])

  return (
    <>
      <div>
        <strong>FAQ:
          {props.lang == "english"
            ? props.category.message.description
            : props.category.message.descriptionDutch}
        </strong>
        <hr />
        <> 
        {questionList != undefined && questionList.map((question: any) => {
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
export default Questions;

