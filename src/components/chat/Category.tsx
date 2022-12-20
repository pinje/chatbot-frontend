import "./Category.css"

function Category(props:any) {
    const passwordQuestion = (e: any) => {
        e.preventDefault();
        props.clickCategory("password");
    }

    const officeQuestion = (e: any) => {
        e.preventDefault();
        props.clickCategory("office");
    }

    const fontysLaptopQuestion = (e: any) => {
        e.preventDefault();
        props.clickCategory("equipment");
    }

    const wifiQuestion = (e: any) => {
        e.preventDefault();
        props.clickCategory("wifi");
    }

    const mediaQuestion = (e: any) => {
        e.preventDefault();
        props.clickCategory("media");
    }

    return (
      <>
      {props.lang == "english" && (<div>
          You can also see our FAQ
          <hr/>
          <button onClickCapture={passwordQuestion}> 
          <img className="icons" src={require('../../img/password4.jpg')}/>                
           Password reset</button><br/>
          <button onClickCapture={officeQuestion}>
          <img className="icons" src={require('../../img/office3.webp')}/>
            Office 365 </button><br/>
          <button onClickCapture={fontysLaptopQuestion}>
          <img className="icons" src={require('../../img/laptop1.jpg')}/>
            Fontys laptop </button><br/>
          <button onClickCapture={wifiQuestion}>
          <img className="icons" src={require('../../img/wifi2.jpg')}/>
            WiFi (eduroam) </button><br/>
          <button onClickCapture={mediaQuestion}>
          <img className="icons" src={require('../../img/video.jpg')}/>
            Audio and video</button><br/>
        </div>)}

        {props.lang == "dutch" && (<div>
          Bekijk ook de vaakgestelde vragen
          <hr/>
          <button onClickCapture={passwordQuestion}> 
          <img className="icons" src={require('../../img/password4.jpg')}/>     
               
           Reset wachtwoord<img className="arrow" src={require('../../img/arrow.png')} /></button>
          <button onClickCapture={officeQuestion}>
          <img className="icons" src={require('../../img/office3.webp')}/>
            Office 365 <img className="arrow" src={require('../../img/arrow.png')} /></button>
          <button onClickCapture={fontysLaptopQuestion}>
          <img className="icons" src={require('../../img/laptop1.jpg')}/>
            Fontys laptop <img className="arrow" src={require('../../img/arrow.png')} /></button>
          <button onClickCapture={wifiQuestion}>
          <img className="icons" src={require('../../img/wifi2.jpg')}/>
            WiFi (eduroam) <img className="arrow" src={require('../../img/arrow.png')} /></button>
          <button onClickCapture={mediaQuestion}>
          <img className="icons" src={require('../../img/video.jpg')}/>
            Audio en video <img className="arrow" src={require('../../img/arrow.png')} /></button>
        </div>)}
        </>
    );
}

export default Category