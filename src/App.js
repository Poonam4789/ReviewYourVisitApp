import React , { Component } from 'react';
import ItemCardView from './components/home/js/item_card_view.js';
import SavedReviews from './components/home/js/saved_review_item.js';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state={
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
          <SavedReviews/>
        </div>
      </header>
    </div>
  );
}
}

export default App;
