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
          <button className="highlight" onClickCapture={passwordQuestion}> 
          <img alt="xd" className="icons" src={require('../../img/password4.jpg')}/>                   
           Password reset<img alt="xd" className="arrow" src={require('../../img/arrow.png')} /></button>
          <button className="highlight" onClickCapture={officeQuestion}>
          <img alt="xd" className="icons" src={require('../../img/office3.webp')}/>
            Office 365 <img alt="xd" className="arrow" src={require('../../img/arrow.png')} /></button>
          <button className="highlight" onClickCapture={fontysLaptopQuestion}>
          <img alt="xd" className="icons" src={require('../../img/laptop1.jpg')}/>
            Fontys laptop <img alt="xd" className="arrow" src={require('../../img/arrow.png')} /></button>
          <button className="highlight" onClickCapture={wifiQuestion}>
          <img alt="xd" className="icons" src={require('../../img/wifi2.jpg')}/>
            WiFi (eduroam) <img alt="xd" className="arrow" src={require('../../img/arrow.png')} /></button>
          <button className="highlight" onClickCapture={mediaQuestion}>
          <img alt="xd" className="icons" src={require('../../img/video.jpg')}/>
            Audio and video <img alt="xd" className="arrow" src={require('../../img/arrow.png')} /></button>
        </div>
    );
}

export default Category;