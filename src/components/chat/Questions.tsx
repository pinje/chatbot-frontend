function Questions(props:any) {

    const question = (e:any, questionId:string) => {
      e.preventDefault();
      return (props.clickQuestion(questionId));
    }

    switch(props.lang) {
      case("english"):
        switch(props.category) {
          case 'password':
            return (
              <div>
                  <strong>FAQ: Password</strong>
                  <hr/>
                  <button onClickCapture={(e) => question(e, "How can I reset my password?")}>Q: How can I reset my password? <img className="arrow" src={require('../../img/arrow.png')} /></button>
              </div>
            );
          case 'office':
            return (
              <div>
                 <strong> FAQ: Office 365</strong>
                  <hr/>
                  <button onClickCapture={(e) => question(e, "What is included in Office 365?")}>Q: What is included in Office 365? <img className="arrow" src={require('../../img/arrow.png')} /></button>
                  <button onClickCapture={(e) => question(e, "Can I get Office 365?")}>Q: Can I get Office 365? <img className="arrow" src={require('../../img/arrow.png')} /></button>
                  <button onClickCapture={(e) => question(e, "Can I add an email account?")}>Q: Can I add an email account? <img className="arrow" src={require('../../img/arrow.png')} /></button>
                  <button onClickCapture={(e) => question(e, "Other Office 365 questions.")}>Q: Other Office 365 questions. <img className="arrow" src={require('../../img/arrow.png')} /></button>
              </div>
            );
          case 'equipment':
          return (
            <div>
             <strong>FAQ: Fontys Laptop</strong>
                <hr/>
                <button onClickCapture={(e) => question(e, "I have Battery, Sound or Camera issues.")}>Q: I have Battery, Sound or Camera issues. <img className="arrow" src={require('../../img/arrow.png')} /></button>
            </div>
          );
          case 'wifi':
            return (
              <div>
             <strong>FAQ: WiFi</strong>
                  <hr/>
                  <button onClickCapture={(e) => question(e, "How to connect to eduroam (students)?")}>Q: How to connect to eduroam (students)? <img className="arrow" src={require('../../img/arrow.png')} /></button>
              </div>
            );
          case 'media':
            return (
              <div>
                  <strong>FAQ: Audio & Video</strong>
                  <hr/>
                  <button onClickCapture={(e) => question(e, "How to use the smart board?")}>Q: How to use the smart board? <img className="arrow" src={require('../../img/arrow.png')} /></button>
              </div>
            );
          default:
            return(null);
        }
        case("dutch"):
        switch(props.category) {
          case 'password':
            return (
              <div>
                <strong>  FAQ: Wachtwoord</strong>
                  <hr/>
                  <button onClickCapture={(e) => question(e, "How kan ik mijn wachtwoord resetten?")}>Q: How kan ik mijn wachtwoord resetten? <img className="arrow" src={require('../../img/arrow.png')} /></button>
              </div>
            );
          case 'office':
            return (
              <div>
               <strong>   FAQ: Office 365</strong>
                  <hr/>
                  <button onClickCapture={(e) => question(e, "Wat is inbegrepen bij Office 365?")}>Q: Wat is inbegrepen bij Office 365? <img className="arrow" src={require('../../img/arrow.png')} /></button>
                  <button onClickCapture={(e) => question(e, "Krijg ik Office 365?")}>Q: Krijg ik Office 365? <img className="arrow" src={require('../../img/arrow.png')} /></button>
                  <button onClickCapture={(e) => question(e, "Kan ik een email account toevoegen?")}>Q: Kan ik een email account toevoegen? <img className="arrow" src={require('../../img/arrow.png')} /></button>
                  <button onClickCapture={(e) => question(e, "Andere Office 365 vragen.")}>Q: Andere Office 365 vragen. <img className="arrow" src={require('../../img/arrow.png')} /></button>
              </div>
            );
          case 'equipment':
          return (
            <div>
               <strong> FAQ: Fontys Laptop</strong>
                <hr/>
                <button onClickCapture={(e) => question(e, "Ik heb batterij, geluid of camera problemen.")}>Q: Ik heb batterij, geluid of camera problemen. <img className="arrow" src={require('../../img/arrow.png')} /></button>
            </div>
          );
          case 'wifi':
            return (
              <div>
               <strong>   FAQ: WiFi </strong>
                  <hr/>
                  <button onClickCapture={(e) => question(e, "Hoe verbind ik met eduroam (studenten)?")}>Q: Hoe verbind ik met eduroam (studenten)? <img className="arrow" src={require('../../img/arrow.png')} /></button>
              </div>
            );
          case 'media':
            return (
              <div>
                 <strong> FAQ: Audio & Video </strong>
                  <hr/>
                  <button onClickCapture={(e) => question(e, "Hoe gebruik ik het smart board?")}>Q: Hoe gebruik ik het smart board? <img className="arrow" src={require('../../img/arrow.png')} /></button>
              </div>
            );
          default:
            return(null);
        }
      default:
        return(null);
    }
}

export default Questions;