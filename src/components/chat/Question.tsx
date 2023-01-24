function Question(props: any) {

  const processQuestion = (e: any, question: any) => {
    e.preventDefault();
    console.log(question)
    props.clickQuestion(question);
  }

  const subQuestions = () => {
    { console.log(props) }

    return (
      props.question.message.children.map((cat: any) => {
        return (
          <div>
            <button onClickCapture={(e) => processQuestion(e, cat)}>
              Q:
              {props.lang == "english"
                ? cat.questionText
                : cat.questionTextDutch}
              <img className="arrow" src={require('../../img/arrow.png')} /></button>
          </div>
        )
      })
    )
  }

  const answer = () => {
    return (
      <div>
        Answer:

        {props.question.message.answer != null
          ? props.question.message.answer.link != null
            ? <a target="_blank" href={props.question.message.answer.link}>
              <img className="arrow-left" src={require("../../img/search.png")} />
            </a>
            : ""
          : ""
        }

        <br />
        {
          props.question.message.answer != null
            ? props.lang == "english"
              ? props.question.message.answer.answerText
              : props.question.message.answer.answerTextDutch
            : ""
        }

      </div >
    );
  }

  const condition = () => {
    console.log(props)
    if (props.question.message.children.length > 0) {
      return subQuestions();
    }
    else {
      return answer();
    }
  }

  return (
    <>
      {condition()}
    </>
  )
}

export default Question;


