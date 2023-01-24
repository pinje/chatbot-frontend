import { CSSProperties, useState } from "react";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";


// function Questions(props: any) {
//   const [questionList, setQuestionList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const selectQuestion = (e: any, question: any) => {
//     e.preventDefault();
//     return (props.clickQuestion(question));
//   }
//   useEffect(() => {
//     console.log(props.category.questions)
//     if (props.category.questions != undefined) {
//       if (props.category.questions[0]) {
//         setQuestionList(props.category.questions)
//       }
//     }
//   }, [])

//   useEffect(() => {
//     console.log(props)
//     if (props.category.questions != undefined) {
//       if (props.category.questions[0]) {
//         setQuestionList(props.category.questions)
//       }
//     }
//   }, [props])

//   useEffect(() => {
//     if (questionList != undefined) {
//       if (questionList.length > 0) {
//         setLoading(false);
//       }
//     }
//   }, [questionList])

//   const override: CSSProperties = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "#457b9d"
//   };

//   return (
//     <>
//       <ClipLoader
//         loading={loading}
//         size={50}
//         color={"#457b9d"}
//         aria-label="Loading Spinner"
//         data-testid="loader"
//         cssOverride={override}
//       />
//       <div>

//         <>
//           {questionList != undefined && questionList.length > 0
//             ? <>
//               < strong > FAQ:
//                 {props.lang == "english"
//                   ? props.category.message.description
//                   : props.category.message.descriptionDutch}
//               </strong>
//               <hr />
//               {questionList.map((question: any) => {
//                 return (
//                   <button onClickCapture={(e) => selectQuestion(e, question)}>
//                     Q:
//                     {props.lang == "english"
//                       ? question.questionText
//                       : question.questionTextDutch}
//                     <img className="arrow" src={require('../../img/arrow.png')} /></button>
//                 )
//               }
//               )}
//             </>
//             : ""
//           }
//         </>
//       </div>
//     </>

//   );
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

