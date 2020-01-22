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
  if(count!==null&&count!==undefined&&count!==""&&count>0){
    this.setState({showReviews:"block"})
  }else{
    this.setState({showReviews:"none"})
  }
}
handleDeleteReview=(e)=>{
  console.log("inside click")
  IndexDB.home_api.clear();
  localStorage.clear();
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
        <div style={{display:"flex",flexDirection:"column"}}>
      <button type="button" id="show_add_review" name="show_add_review"  style={{display:this.state.toggleAddReviewButtonVisibility}}
       className="showAddReview" onClick={this.handleShowAddReviewClick}>+ Add Review</button>

          <button type="button" id="delete_all" name="delete_all"  style={{display:this.state.showReviews}}
       className="delete_all"onClick={this.handleDeleteReview}>- Delete All</button>

       </div>
        <div className="container" style={{display:this.state.addReviewContainer}}>
          <ItemCardView/>
        </div>
        <div className="saved_review" style={{display:this.state.showReviews,textAlign:"left"}}>
        <p className="text_header" style={{color:"#FFFFFF"}}>REVIEWS</p>
          <SavedReviews/>
        </div>
      </header>
    </div>
  );
}
}

export default App;
