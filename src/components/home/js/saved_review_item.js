
import React from "react";
import "../css/item_card_view.css";
import {IndexDB} from '../../db/dbhelper.js';
class SavedReviews extends React.Component {
    constructor(props){
        super(props)
        this.textAreaRef = React.createRef();
        this.state={
        deleteIcon:require('../../images/delete.png'),
        savedReviews:[]
        };
    }

    componentDidMount(){
        var list = IndexDB.home_api.toArray().then((data)=>{
            console.log(data)
           if(data.length>0){
           var reviewList= data.map((data)=>{
               return this.createUI(data)
            });
            this.setState({savedReviews:reviewList});
        }
        });
        console.log(list);
    }

    handleRecordComment(id,item,e){
        e.preventDefault();
        var userSelection = window.getSelection().getRangeAt(0);
        console.log(userSelection);
        localStorage.setItem(item+id,userSelection);
        this.highlightRange(id,item,userSelection);
    }
     highlightRange(id,item,range) {
         var hightlight_id ="#div_"+item+"_comment"+id;
         console.log(hightlight_id);
        var review_comment = document.querySelector(hightlight_id);
        console.log(review_comment)
        review_comment.setAttribute("style","display:block");
        var newNode = document.createElement("div");
        newNode.setAttribute(
           "style",
           "background-color: yellow; display: inline;"
        );
        newNode.appendChild(range.extractContents());
        range.insertNode(newNode);
    }

    handleDeleteReview =(id,e)=>{
        console.log("delete "+id);
        IndexDB.home_api.delete(id);
        localStorage.setItem(
            "review_count",
            parseInt(localStorage.getItem("review_count")-1)
          );
            window.location="/";
    }
    handleSaveReviewComment=(id,item,e)=>{
        var _id= "#"+item+"_comment"+id;
        var review_comment = document.querySelector(_id);
        var text = review_comment.value;
        localStorage.setItem(_id,text);

        var div_review_comment = document.querySelector("#div_"+item+"_comment"+id);
        div_review_comment.setAttribute("style","display:none")
    }
    handleShowHignlight=(id,item,e)=>{
      var _id= "#"+item+"_comment"+id;
      console.log(_id)
      var commentedText = localStorage.getItem(_id);
      if(commentedText!==null){
      alert("Recorded Comment : "+commentedText);
      }
    }
    createUI=(result)=>{
        console.log(result.ID)
        console.log(result.data)
        var id =result.ID;
        var data=result.data;
        return(
            <div className="saved_card_container" key={id}>
            <div style={{position:"relative",textAlign:"right"}}>
            <img src={this.state.deleteIcon}  style={{width:"3vw",height:"3vw"}} onClick={this.handleDeleteReview.bind(this,id)} alt="delete"/>
            </div>
            <p className="saved_text_heading"> Name of the villa<span className="saved_text_value"> :  {data.name}</span></p>
            <p className="saved_text_heading"> Date of visit<span className="saved_text_value"> :  {data.date}</span></p>
             <p className="saved_text_heading"> Pincode<span className="saved_text_value"> : {data.pincode}</span></p>
             <p className="saved_text_heading"> Owner's name (optional)<span className="saved_text_value"> :  {data.owner}</span> </p>
            <div>
             <div className="saved_textarea_heading"> A note about the surrounding area of the villa<span className="saved_text_value" onClick={this.handleShowHignlight.bind(this,id,"review")} id={"surrounding"+id}> :  {data.note_surrounding}</span>
             <span className="tooltiptext" onClick={this.handleRecordComment.bind(this,id,"review")}><img src={require('../../images/edit.png')}  style={{width:"2vw",height:"2vw"}} alt="edit"/>
             </span>
                <div id={"div_review_comment"+id} className="div_review_comment" style={{display:"none"}} >
                <input type="text" id={"review_comment"+id}  className="review_comment"/>
                <button type="button" id="save" onClick={this.handleSaveReviewComment.bind(this,id,"review")}>save</button>
                </div>
             </div>
             </div>
             <div>
             <div className="saved_textarea_heading"> A note about the construction quality of the villa<span className="saved_text_value" onClick={this.handleShowHignlight.bind(this,id,"quality")} id={"quality"+id}> :  {data.note_quality}</span>
             <span className="tooltiptext" onClick={this.handleRecordComment.bind(this,id,"quality")}><img src={require('../../images/edit.png')}  style={{width:"2vw",height:"2vw"}} alt="edit"/></span>
                <div id={"div_quality_comment"+id} className="div_quality_comment" style={{display:"none"}} >
                <input type="text" id={"quality_comment"+id}  className="quality_comment"/>
                <button type="button" id="save" onClick={this.handleSaveReviewComment.bind(this,id,"quality")}>save</button>
                </div>
            </div>
            </div>
            <div>
             <div className="saved_textarea_heading">A note about the villa decor<span className="saved_text_value" onClick={this.handleShowHignlight.bind(this,id,"about")} id={"about"+id}> :  {data.note_about}</span>
             <span className="tooltiptext" onClick={this.handleRecordComment.bind(this,id,"about")}><img src={require('../../images/edit.png')}  style={{width:"2vw",height:"2vw"}} alt="edit"/></span> 
             <div id={"div_about_comment"+id} className="div_about_comment" style={{display:"none"}} >
                <input type="text" id={"about_comment"+id}  className="about_comment"/>
                <button type="button" id="save" onClick={this.handleSaveReviewComment.bind(this,id,"about")}>save</button>
                </div>
             </div>
             </div>
             </div>
        )
      
    }
    render(){
        console.log(this.state.savedReviews.length)
        if(this.state.savedReviews.length>0){
        return (
            <div className="savedcard" style={{width:"50%",marginTop:"5vw"}}>
                {this.state.savedReviews}
             </div>
        )
        }else{
            return(<div></div>)
        }
    }
}
export default SavedReviews;