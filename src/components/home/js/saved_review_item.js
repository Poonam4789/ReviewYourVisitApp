
import React from "react";
import "../css/item_card_view.css";
import {IndexDB} from '../../db/dbhelper.js';
class SavedReviews extends React.Component {
    constructor(props){
        super(props)
        this.state={
        savedReviews:[]
        }
    }
    componentDidMount(){
        var totalReviews = localStorage.getItem("review_count");
        console.log(totalReviews);
        var list = IndexDB.home_api.toArray().then((data)=>{
            console.log(data)
           var reviewList= data.map((data)=>{
               return this.createUI(data)
            });
            this.setState({savedReviews:reviewList});
        });
        console.log(list);
    }
    createUI=(result)=>{
        console.log(result.data)
        var data=result.data;
        return(
            <div className="saved_card_container">
            <p className="saved_text_heading"> Name of the villa<span className="saved_text_value"> :  {data.name}</span></p>
            <p className="saved_text_heading"> Date of visit<span className="saved_text_value"> :  {data.date}</span></p>
             <p className="saved_text_heading"> Pincode<span className="saved_text_value"> : {data.pincode}</span></p>
             <p className="saved_text_heading"> Owner's name (optional)<span className="saved_text_value"> :  {data.owner}</span> </p>
             <p className="saved_text_heading"> A note about the surrounding area of the villa<span className="saved_text_value"> :  {data.note_surrounding}</span> </p>
             <p className="saved_text_heading"> A note about the construction quality of the villa<span className="saved_text_value"> :  {data.note_quality}</span> </p>
             <p className="saved_text_heading">A note about the villa decor<span className="saved_text_value"> :  {data.note_about}</span></p>
             </div>
        )
      
    }
    render(){
        return (
            <div className="savedcard" style={{width:"80%",marginTop:"5vw"}}>
                {this.state.savedReviews}
             </div>
        )
    }
}
export default SavedReviews;