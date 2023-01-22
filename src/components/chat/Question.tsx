function Question(props: any) {

  //check if question has childer, if it does - return them as questions. 
  //if it does not, then do the thing 

  //the thing needs to happen here, as each previos question will be fucked 


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
            <button onClickCapture={e => { processQuestion(e, cat) }} className="catBtn">
              <>{console.log(cat)}</>
              <img className="icons" src={require('../../img/password4.jpg')} />
              <div>
                {props.lang == "english"
                  ? cat.questionText
                  : cat.questionTextDutch}</div></button><br />
          </div>
        )
      })
    )
  }

  const answer = () => {
    return (
      <div>
        Answer:

        {props.question.message.answer.link != null
          ? <a target="_blank" href={props.question.message.answer.link}>
            <img className="arrow-left" src={require("../../img/search.png")} />
          </a>
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




  // switch (props.question) {
  //   // Password =================================================================================
  //   case "How can I reset my password?":
  //     return (
  //       <div>
  //         Answer:
  //         <a
  //           target="_blank"
  //           href="https://google.com/search?q=Fontys+Service+Desk"
  //         >
  //           <img
  //             className="arrow-left"
  //             src={require("../../img/search.png")}
  //           />
  //         </a>
  //         <ul>
  //           <li>
  //             If you know your password -
  //             <a
  //               target="_blank"
  //               href="https://intern.fontys.nl/wwselfservice/ChangePassword.aspx"
  //             >
  //               Wijzigen wachtwoord (fontys.nl)
  //             </a>
  //           </li>
  //           <li>
  //             If you don't know your password <br></br>- call via WhatsApp to
  //             ServiceDesk IT or visit the student desk of your education.
  //           </li>
  //         </ul>
  //       </div>
  //     );

  //   // Office 365 =================================================================================
  //   case "What is included in Office 365?":
  //     return (
  //       <div>
  //         Answer:
  //         <a
  //           target="_blank"
  //           href="https://google.com/search?q=Fontys+Microsoft+Office"
  //         >
  //            <img
  //             className="arrow-left"
  //             src={require("../../img/search.png")}
  //           />
  //         </a>
  //         <br />
  //         The Office version we provide contains Word, Excel and Powerpoint.
  //       </div>
  //     );
  //   case "Can I get Office 365?":
  //     return (
  //       <div>
  //         Answer: <br />
  //         You can install it on 5 separate devices via{" "}
  //         <a target="_blank" href="https://login.microsoftonline.com/">
  //           portal.office.com
  //         </a>{" "}
  //       </div>
  //     );
  //   case "Can I add an email account?":
  //     return (
  //       <div>
  //         Answer: <br />
  //         You can only add email accounts which support Exchange (no pop3 or
  //         imap).
  //       </div>
  //     );
  //   // case 'How can I enable presentation mode (PowerPoint)?':
  //   //     return (
  //   //         <div>Answer: <br/>To use powerpoint in presenter mode click on ... (no answer)</div>
  //   //     );
  //   case "Other Office 365 questions.":
  //     return (
  //       <div>
  //         Answer: <br />
  //         Visit{" "}
  //         <a
  //           target="_blank"
  //           href="https://connect.fontys.nl/diensten/IT/Paginas/Office-365.aspx#english"
  //         >
  //           Office 365 (fontys.nl)
  //         </a>
  //       </div>
  //     );

  //   // Equipment =================================================================================
  //   // case 'I have direct access problems in the start up of the laptop.':
  //   //     return (
  //   //         <div>Answer: <br/>No answer.</div>
  //   //     );
  //   case "I have Battery, Sound or Camera issues.":
  //     return (
  //       <div>
  //         Answer:
  //         <a
  //           target="_blank"
  //           href="https://google.com/search?q=Fontys+Service+Desk"
  //         >
  //            <img
  //             className="arrow-left"
  //             src={require("../../img/search.png")}
  //           />
  //         </a>
  //         <br />
  //         Please visit the IT service team on your campus.
  //       </div>
  //     );

  //   // WiFi =================================================================================
  //   case "How to connect to eduroam (students)?":
  //     return (
  //       <div>
  //         Answer: <br />
  //         See the website:{" "}
  //         <a
  //           target="_blank"
  //           href="https://connect.fontys.nl/diensten/IT/handleidingen/Paginas/verbindenmeteduroam.aspx"
  //         >
  //           Handleiding Verbinden met Eduroam (fontys.nl) (Dutch)
  //         </a>
  //       </div>
  //     );
  //   // case 'How to connect to eduroam as a visitor (guest lecturer)?':
  //   //     return (
  //   //         <div>Answer: <br/>No answer.</div>
  //   //     );

  //   // Audio & Video =================================================================================
  //   case "How to use the smart board?":
  //     return (
  //       <div>
  //         Answer: <br />
  //         See the website:{" "}
  //         <a
  //           target="_blank"
  //           href="https://connect.fontys.nl/diensten/IT/handleidingen/Paginas/Audio_visuele_middelen.aspx"
  //         >
  //           Pagina's - Over Audio visuele middelen (fontys.nl) (Dutch)
  //         </a>
  //       </div>
  //     );
  //   // DUTCH
  //   // Password =================================================================================
  //   case "How kan ik mijn wachtwoord resetten?":
  //     return (
  //       <div>
  //         Antwoord:
  //         <a
  //           target="_blank"
  //           href="https://google.com/search?q=Fontys+Service+Desk"
  //         >
  //           <img
  //             className="arrow-left"
  //             src={require("../../img/search.png")}
  //           />
  //         </a>
  //         <ul>
  //           <li>
  //             Als U uw wachtwoord weet -
  //             <a
  //               target="_blank"
  //               href="https://intern.fontys.nl/wwselfservice/ChangePassword.aspx"
  //             >
  //               Wijzigen wachtwoord (fontys.nl)
  //             </a>
  //           </li>
  //           <li>
  //             Als U uw wachtwoord bent vergeten <br></br>- bel via WhatsApp naar de IT
  //             ServiceDesk of ga naar de student desk bij uw studielocatie.
  //           </li>
  //         </ul>
  //       </div>
  //     );

  //   // Office 365 =================================================================================
  //   case "Wat is inbegrepen bij Office 365?":
  //     return (
  //       <div>
  //         Antwoord:
  //         <a
  //           target="_blank"
  //           href="https://google.com/search?q=Fontys+Microsoft+Office"
  //         >
  //            <img
  //             className="arrow-left"
  //             src={require("../../img/search.png")}
  //           />
  //         </a>
  //         <br />
  //         De Office versie die wij aanbiezen bevat Word, Excel en Powerpoint.
  //       </div>
  //     );
  //   case "Krijg ik Office 365?":
  //     return (
  //       <div>
  //         Antwoord: <br />
  //         Je kan op 5 verschillende apparaten installeren via{" "}
  //         <a target="_blank" href="https://login.microsoftonline.com/">
  //           portal.office.com
  //         </a>{" "}
  //       </div>
  //     );
  //   case "Kan ik een email account toevoegen?":
  //     return (
  //       <div>
  //         Antwoord: <br />
  //         Je kan alleen een Exchange ondersteunend email account toevoegen (geen pop3 of
  //         imap).
  //       </div>
  //     );
  //   // case 'How can I enable presentation mode (PowerPoint)?':
  //   //     return (
  //   //         <div>Answer: <br/>To use powerpoint in presenter mode click on ... (no answer)</div>
  //   //     );
  //   case "Andere Office 365 vragen.":
  //     return (
  //       <div>
  //         Antwoord: <br />
  //         Bezoek{" "}
  //         <a
  //           target="_blank"
  //           href="https://connect.fontys.nl/diensten/IT/Paginas/Office-365.aspx#english"
  //         >
  //           Office 365 (fontys.nl)
  //         </a>
  //       </div>
  //     );

  //   // Equipment =================================================================================
  //   // case 'I have direct access problems in the start up of the laptop.':
  //   //     return (
  //   //         <div>Answer: <br/>No answer.</div>
  //   //     );
  //   case "Ik heb batterij, geluid of camera problemen.":
  //     return (
  //       <div>
  //         Antwoord:
  //         <a
  //           target="_blank"
  //           href="https://google.com/search?q=Fontys+Service+Desk"
  //         >
  //            <img
  //             className="arrow-left"
  //             src={require("../../img/search.png")}
  //           />
  //         </a>
  //         <br />
  //         Bezoek de IT helpdesk op uw campus.
  //       </div>
  //     );

  //   // WiFi =================================================================================
  //   case "Hoe verbind ik met eduroam (studenten)?":
  //     return (
  //       <div>
  //         Antwoord: <br />
  //         Bezoek de website:{" "}
  //         <a
  //           target="_blank"
  //           href="https://connect.fontys.nl/diensten/IT/handleidingen/Paginas/verbindenmeteduroam.aspx"
  //         >
  //           Handleiding Verbinden met Eduroam (fontys.nl) (Dutch)
  //         </a>
  //       </div>
  //     );
  //   // case 'How to connect to eduroam as a visitor (guest lecturer)?':
  //   //     return (
  //   //         <div>Answer: <br/>No answer.</div>
  //   //     );

  //   // Audio & Video =================================================================================
  //   case "Hoe gebruik ik het smart board?":
  //     return (
  //       <div>
  //         Antwoord: <br />
  //         Bezoek de website:{" "}
  //         <a
  //           target="_blank"
  //           href="https://connect.fontys.nl/diensten/IT/handleidingen/Paginas/Audio_visuele_middelen.aspx"
  //         >
  //           Pagina's - Over Audio visuele middelen (fontys.nl) (Dutch)
  //         </a>
  //       </div>
  //     );
  //   default:
  //     return null;
  // }

