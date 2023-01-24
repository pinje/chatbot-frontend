import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchTopics } from "../actions/watson";
import "./Category.css";
import ClipLoader from "react-spinners/ClipLoader";

function Category(props: any) {
    const { categories, fetchTopics } = props;
    const [fetched, setFetched] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchTopics();
    }, [])

    useEffect(() => {
        if (categories != undefined && categories.length > 0) {
            console.log(categories)
            setFetched(categories[0].fetchedCategories);
            setLoading(false);
        }
    }, [categories]);

    const processQuestion = (e: any, cat: any) => {
        e.preventDefault();
        props.clickCategory(cat);
    }

    const imageDisplay = (image: string) => {
        return 'data:image/jpeg;base64,' + image;
    }

    return (
        <>
            <strong>FAQ</strong>
            <hr />
            <div>
                <ClipLoader
                    loading={loading}
                    size={50}
                    color={"#457b9d"}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            {fetched.map((cat: any) => {
                return (
                    <div key={cat.id}>
                        <button onClickCapture={e => { processQuestion(e, cat) }} className="catBtn">
                            <img className="icons" src={imageDisplay(cat.photo)} />
                            <div>
                                {props.lang == "english"
                                    ? cat.description
                                    : cat.descriptionDutch}</div></button><br />
                    </div>
                )
            })
            }
        </>
    );
}

const categoryMapStateToProps = (state: { watson: { categories: any } }) => ({
    categories: state.watson.categories

});

export default connect(categoryMapStateToProps, { fetchTopics })(Category);