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
                  FAQ: Password
                  <hr/>
                  <button onClickCapture={(e) => question(e, "How can I reset my password?")}>Q: How can I reset my password? <img className="arrow" src={require('../../img/arrow.png')} /></button>
              </div>
            );
          case 'office':
            return (
              <div>
                  FAQ: Office 365
                  <hr/>
                  <button onClickCapture={(e) => question(e, "What is included in Office 365?")}>Q: What is included in Office 365? <img className="arrow" src={require('../../img/arrow.png')} /></button>
                  <button onClickCapture={(e) => question(e, "Can I get Office 365?")}>Q: Can I get Office 365? <img className="arrow" src={require('../../img/arrow.png')} /></button>
                  <button onClickCapture={(e) => question(e, "Can I add an email account?")}>Q: Can I add an email account? <img className="arrow" src={require('../../img/arrow.png')} /></button>
                  {/* <button onClickCapture={(e) => question(e, "How to enable presentation mode (PowerPoint)?")}>Q: How to enable presentation mode (PowerPoint)? <img className="arrow" src={require('../../img/arrow.png')} /></button> */}
                  <button onClickCapture={(e) => question(e, "Other Office 365 questions.")}>Q: Other Office 365 questions. <img className="arrow" src={require('../../img/arrow.png')} /></button>
              </div>
            );
          case 'equipment':
          return (
            <div>
                FAQ: Fontys Laptop
                <hr/>
                {/* <button onClickCapture={(e) => question(e, "I have direct access problems in the start up of the laptop.")}>Q: I have direct access problems in the start up of the laptop. <img className="arrow" src={require('../../img/arrow.png')} /></button> */}
                <button onClickCapture={(e) => question(e, "I have Battery, Sound or Camera issues.")}>Q: I have Battery, Sound or Camera issues. <img className="arrow" src={require('../../img/arrow.png')} /></button>
            </div>
          );
          case 'wifi':
            return (
              <div>
                  FAQ: WiFi
                  <hr/>
                  <button onClickCapture={(e) => question(e, "How to connect to eduroam (students)?")}>Q: How to connect to eduroam (students)? <img className="arrow" src={require('../../img/arrow.png')} /></button>
                  {/* <button onClickCapture={(e) => question(e, "How to connect to eduroam as a visitor (guest lecturer)?")}>Q: How to connect to eduroam as a visitor (guest lecturer)? <img className="arrow" src={require('../../img/arrow.png')} /></button> */}
              </div>
            );
          case 'media':
            return (
              <div>
                  FAQ: Audio & Video
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
                  FAQ: Wachtwoord
                  <hr/>
                  <button onClickCapture={(e) => question(e, "How can I reset my password?")}>Q: How kan ik mijn wachtwoord resetten? <img className="arrow" src={require('../../img/arrow.png')} /></button>
              </div>
            );
          case 'office':
            return (
              <div>
                  FAQ: Office 365
                  <hr/>
                  <button onClickCapture={(e) => question(e, "What is included in Office 365?")}>Q: Wat is inbegrepen bij Office 365? <img className="arrow" src={require('../../img/arrow.png')} /></button>
                  <button onClickCapture={(e) => question(e, "Can I get Office 365?")}>Q: Krijg ik Office 365? <img className="arrow" src={require('../../img/arrow.png')} /></button>
                  <button onClickCapture={(e) => question(e, "Can I add an email account?")}>Q: Kan ik een email account toevoegen? <img className="arrow" src={require('../../img/arrow.png')} /></button>
                  {/* <button onClickCapture={(e) => question(e, "How to enable presentation mode (PowerPoint)?")}>Q: How to enable presentation mode (PowerPoint)? <img className="arrow" src={require('../../img/arrow.png')} /></button> */}
                  <button onClickCapture={(e) => question(e, "Other Office 365 questions.")}>Q: Andere Office 365 vragen. <img className="arrow" src={require('../../img/arrow.png')} /></button>
              </div>
            );
          case 'equipment':
          return (
            <div>
                FAQ: Fontys Laptop
                <hr/>
                {/* <button onClickCapture={(e) => question(e, "I have direct access problems in the start up of the laptop.")}>Q: I have direct access problems in the start up of the laptop. <img className="arrow" src={require('../../img/arrow.png')} /></button> */}
                <button onClickCapture={(e) => question(e, "I have Battery, Sound or Camera issues.")}>Q: Ik heb batterij, geluid of camera problemen. <img className="arrow" src={require('../../img/arrow.png')} /></button>
            </div>
          );
          case 'wifi':
            return (
              <div>
                  FAQ: WiFi
                  <hr/>
                  <button onClickCapture={(e) => question(e, "How to connect to eduroam (students)?")}>Q: Hoe verbind ik met eduroam (studenten)? <img className="arrow" src={require('../../img/arrow.png')} /></button>
                  {/* <button onClickCapture={(e) => question(e, "How to connect to eduroam as a visitor (guest lecturer)?")}>Q: How to connect to eduroam as a visitor (guest lecturer)? <img className="arrow" src={require('../../img/arrow.png')} /></button> */}
              </div>
            );
          case 'media':
            return (
              <div>
                  FAQ: Audio & Video
                  <hr/>
                  <button onClickCapture={(e) => question(e, "How to use the smart board?")}>Q: Hoe gebruik ik het smart board? <img className="arrow" src={require('../../img/arrow.png')} /></button>
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