
import React from "react";
import "../css/item_card_view.css";
import {IndexDB} from '../../db/dbhelper.js';
class SavedReviews extends React.Component {
    constructor(props){
        super(props)
        this.textAreaRef = React.createRef();
        this.state={
        showReviews:props.showReviews,   
        deleteIcon:require('../../images/delete.png'),
        savedReviews:[],
        isDirty: false,
            selection: '',
            anchorNode: '?',
            focusNode: '?',
            selectionStart: '?',
            selectionEnd: '?',
            first: '',
            middle: '',
            last: ''
        };
        this.onMouseUpHandler = this.onMouseUpHandler.bind(this);
    }
    getSelection() {
        const textArea = document.querySelector("#surrounding");
        console.log(textArea.innerText)
        console.log(textArea.innerText.substring(
                textArea.selectionStart,
                textArea.selectionEnd
            )
        );
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
    onMouseUpHandler(e) {
        console.log("onMouseUpHandler")
        e.preventDefault();
        const text = document.querySelector("#surrounding");
        console.log("text "+text.innerText)
        const selectionObj = (window.getSelection && window.getSelection());
        const selection = selectionObj.toString();
        const anchorNode = selectionObj.anchorNode;
        const focusNode = selectionObj.focusNode;
        const anchorOffset = selectionObj.anchorOffset;
        const focusOffset = selectionObj.focusOffset;
        const position = anchorNode.compareDocumentPosition(focusNode);
        let forward = false;

        if (position === anchorNode.DOCUMENT_POSITION_FOLLOWING) {
            forward = true;
        } else if (position === 0) {
            forward = (focusOffset - anchorOffset) > 0;
        }
        console.log("forward "+forward)
        let selectionStart = forward ? anchorOffset : focusOffset;

        if (forward) {
            if (anchorNode.parentNode.getAttribute('data-order')
                && anchorNode.parentNode.getAttribute('data-order') === 'middle') {
                selectionStart += this.state.selectionStart;
            }
            if (anchorNode.parentNode.getAttribute('data-order')
                && anchorNode.parentNode.getAttribute('data-order') === 'last') {
                selectionStart += this.state.selectionEnd;
            }
        } else {
            if (focusNode.parentNode.getAttribute('data-order')
                && focusNode.parentNode.getAttribute('data-order') === 'middle') {
                selectionStart += this.state.selectionStart;
            }
            if (focusNode.parentNode.getAttribute('data-order')
                && focusNode.parentNode.getAttribute('data-order') === 'last') {
                selectionStart += this.state.selectionEnd;
            }
        }
        console.log("selectionStart "+selectionStart)

        const selectionEnd = selectionStart + selection.length;
        const first = text.innerText.slice(0, selectionStart);
        const middle = text.innerText.slice(selectionStart, selectionEnd);
        const last = text.innerText.slice(selectionEnd);

        console.log("selectionEnd "+selectionEnd)
        console.log("first"+first)
        console.log("middle "+middle)
        console.log("last "+last)
        this.setState({
            selection,
            anchorNode,
            focusNode,
            selectionStart,
            selectionEnd,
            first,
            middle,
            last
        });

        if (this.props.selectionHandler) {
            this.props.selectionHandler({
                selection,
                selectionStart,
                selectionEnd
            });
        }

    }
    handleDeleteReview =(id,e)=>{
        console.log("delete "+id);
        IndexDB.home_api.delete(id);
        window.location="/";
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
             <p className="saved_text_heading"> A note about the surrounding area of the villa<span className="saved_text_value" id="surrounding" onMouseUp={this.onMouseUpHandler}> :  {data.note_surrounding}</span> </p>
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