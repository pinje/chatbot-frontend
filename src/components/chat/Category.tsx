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
        <div>
          You can also see our FAQ
          <hr/>
          <button onClickCapture={passwordQuestion}>Password reset <img className="arrow" src={require('../../img/arrow.png')} /></button>
          <button onClickCapture={officeQuestion}>Office 365 <img className="arrow" src={require('../../img/arrow.png')} /></button>
          <button onClickCapture={fontysLaptopQuestion}>Fontys laptop <img className="arrow" src={require('../../img/arrow.png')} /></button>
          <button onClickCapture={wifiQuestion}>WiFi (eduroam) <img className="arrow" src={require('../../img/arrow.png')} /></button>
          <button onClickCapture={mediaQuestion}>Audio and video <img className="arrow" src={require('../../img/arrow.png')} /></button>
        </div>
    );
}

export default Category;