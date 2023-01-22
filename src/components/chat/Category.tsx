import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchTopics } from "../actions/watson";
import "./Category.css"


function Category(props: any) {

    const { categories, fetchTopics } = props;

    const [fetched, setFetched] = useState([]);
    const [render, setRender] = useState<boolean>(false);

    useEffect(() => {
        fetchTopics();
        if (categories != undefined && categories.length > 0) {
            console.log(categories)
            setFetched(categories[0].fetchedCategories);
            setRender(true)
            // console.log(categories[0].fetchedCategories)
        }
    }, []);

    useEffect(() => {
        if (render == true) {
            console.log(categories)
            setFetched(categories[0].fetchedCategories);
        }
    }, [render]);

    const processQuestion = (e: any, name: string, id: number) => {
        e.preventDefault();
        props.clickCategory(name, id);
    }

    // const officeQuestion = (e: any) => {
    //     e.preventDefault();
    //     props.clickCategory("office");
    // }

    // const fontysLaptopQuestion = (e: any) => {
    //     e.preventDefault();
    //     props.clickCategory("equipment");
    // }

    // const wifiQuestion = (e: any) => {
    //     e.preventDefault();
    //     props.clickCategory("wifi");
    // }

    // const mediaQuestion = (e: any) => {
    //     e.preventDefault();
    //     props.clickCategory("media");
    // }


    return (
        <>
            {fetched.map((cat: any) => {
                return (
                    <div>
                        <button onClickCapture={e => { processQuestion(e, cat.description, cat.id) }} className="catBtn">
                            <>{console.log(cat)}</>
                            <img className="icons" src={require('../../img/password4.jpg')} />
                            <div>{cat.description}</div></button><br />
                    </div>
                )
            })
            }

            {/* {props.lang == "english" && (<div>
                <strong>FAQ</strong>
                <hr />
                <button onClickCapture={passwordQuestion} className="catBtn">
                    <img className="icons" src={require('../../img/password4.jpg')} />
                    <div>Password reset</div></button><br />
                <button onClickCapture={officeQuestion} className="catBtn">
                    <img className="icons" src={require('../../img/office3.png')} />
                    <div> Office 365</div> </button><br />
                <button onClickCapture={fontysLaptopQuestion} className="catBtn">
                    <img className="icons" src={require('../../img/laptop1.jpg')} />
                    <div>Fontys laptop</div> </button><br />
                <button onClickCapture={wifiQuestion} className="catBtn">
                    <img className="icons" src={require('../../img/wifi2.jpg')} />
                    <div>  WiFi (eduroam)</div> </button><br />
                <button onClickCapture={mediaQuestion} className="catBtn">
                    <img className="icons" src={require('../../img/video.jpg')} />
                    <div> Audio and video</div></button><br />
            </div>)}

            {props.lang == "dutch" && (<div>
                <strong>FAQ</strong>
                <hr />
                <button onClickCapture={passwordQuestion} className="catBtn">
                    <img className="icons" src={require('../../img/password4.jpg')} />
                    <div>
                        Reset wachtwoord</div></button>
                <button onClickCapture={officeQuestion} className="catBtn">
                    <img className="icons" src={require('../../img/office3.png')} />
                    <div>  Office 365</div> </button>
                <button onClickCapture={fontysLaptopQuestion} className="catBtn">
                    <img className="icons" src={require('../../img/laptop1.jpg')} />
                    <div> Fontys laptop </div></button>
                <button onClickCapture={wifiQuestion} className="catBtn">
                    <img className="icons" src={require('../../img/wifi2.jpg')} />
                    <div> WiFi (eduroam) </div></button>
                <button onClickCapture={mediaQuestion} className="catBtn">
                    <img className="icons" src={require('../../img/video.jpg')} />
                    <div> Audio en video </div></button>
            </div>)} */}
        </>
    );
}

const categoryMapStateToProps = (state: { watson: { categories: any } }) => ({
    categories: state.watson.categories

});

export default connect(categoryMapStateToProps, { fetchTopics })(Category);