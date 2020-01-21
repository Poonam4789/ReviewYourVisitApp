import React , { Component } from 'react';
import ItemCardView from './components/home/js/item_card_view.js';
import SavedReviews from './components/home/js/saved_review_item.js';
import {IndexDB} from '../src/components/db/dbhelper.js';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state={
      deleteIcon:require('../src/components/images/delete.png'),
      reviewList:[],
      showReviews:"none",
      toggleAddReviewButtonVisibility:"block",
      addReviewContainer:"none"
    }
  }
  componentDidMount(){
  var count = localStorage.getItem("review_count");
  if(count!==null&&count!==undefined&&count!==""){
    this.setState({showReviews:"block"})
  }
}
handleDeleteReview=(e)=>{
  console.log("inside click")
  IndexDB.home_api.clear();
  this.setState({showReviews:"none"})
  window.location="/";
}
handleShowAddReviewClick=(e)=>{
  if(this.state.addReviewContainer==="none"){
    this.setState({toggleAddReviewButtonVisibility:"none"})
    this.setState({addReviewContainer:"block"})
  }else{
    this.setState({toggleAddReviewButtonVisibility:"block"})
    this.setState({addReviewContainer:"none"})
  }
}
  render(){
  return (
    <div className="App">
      <header className="App-header">
      <button type="button" id="show_add_review" name="show_add_review"  style={{display:this.state.toggleAddReviewButtonVisibility}}
       className="showAddReview" onClick={this.handleShowAddReviewClick}>+ Add Review</button>
        <div className="container" style={{display:this.state.addReviewContainer}}>
          <ItemCardView/>
        </div>
        <div className="saved_review" style={{display:this.state.showReviews}}>
        <p className="text_header" style={{color:"#FFFFFF"}}>REVIEWS</p>
          <SavedReviews showReviews={this.state.showReviews}/>
        </div>
        <div style={{zIndex:"2",bottom:0,alignSelf:"center",textAlign:"center",marginBottom:"3vw",display:this.state.showReviews }}>
            <p style={{fontWeight:900}}>Delete All</p>
            <img src={this.state.deleteIcon}  style={{width:"3vw",height:"3vw"}} onClick={this.handleDeleteReview} alt="delete"/>
            </div>
      </header>
    </div>
  );
}
}

export default App;
