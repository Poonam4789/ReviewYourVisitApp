import React from "react";
import "../css/item_card_view.css";
import {IndexDB} from '../../db/dbhelper.js';
class ItemCardView extends React.Component {

handleKeyDown = e => {
if (e.key === "Enter") {
    console.log(e.target);
    e.preventDefault();
    const inputs = Array.prototype.slice.call(
    document.querySelectorAll("input")
    );
    console.log(inputs);
    const index = (inputs.indexOf(document.activeElement) + 1) % inputs.length;
    console.log(index);
    const input = inputs[index];
    console.log(input);
    input.focus();
}
};
handleSubmitClick=e=>{
var name = document.querySelector("#name");
var date = document.querySelector("#date");
var pincode = document.querySelector("#pincode");
var owner = document.querySelector("#owner");
var note_surrounding = document.querySelector("#note_surrounding");
var note_quality = document.querySelector("#note_quality");
var note_about = document.querySelector("#note_about");
var allVaues = this.validate(name,date,pincode,owner,note_surrounding,note_quality,note_about);

if(allVaues){
    var currentTimeStamp = new Date().getTime();
    var data = {
    "name":name.value,
    "date":date.value,
    "pincode":pincode.value,
    "owner":owner.value,
    "note_surrounding":note_surrounding.value,
    "note_quality":note_quality.value,
    "note_about":note_about.value
    } 
  
    var reviewCount = localStorage.getItem("review_count");
    console.log(reviewCount)
    if(reviewCount===null){
        localStorage.setItem(
            "review_count",
            parseInt(1)
          );
        IndexDB.home_api.put({
            ID:  parseInt(1),
            data: data,
            timestamp: currentTimeStamp
          });
    }else{
        localStorage.setItem(
            "review_count",
            parseInt(reviewCount)+1
          );
        IndexDB.home_api.put({
            ID:  parseInt(reviewCount)+1,
            data: data,
            timestamp: currentTimeStamp
          });
    }

      window.location="/";
}
};

validate=(name,date,pincode,owner,note_surrounding,note_quality,note_about)=>{

var validationError="";

if(name.value===null ||name.value===undefined ||name.value==="")
{
    validationError ="Please enter name of the villa.";
}else if(date.value===null||date.value===undefined||date.value==="")
{
validationError ="Please enter date of visit.";
}else if(pincode.value===null||pincode.value===undefined||pincode.value==="")
{
validationError ="Please enter Pincode.";
}
else if(note_surrounding.value===null||note_surrounding.value===undefined||note_surrounding.value==="")
{
validationError ="Please enter a note about the surrounding area of the villa";
}
else if(note_quality.value===null||note_quality.value===undefined||note_quality.value==="")
{
    validationError ="Please enter a note about the construction quality of the villa";
}
else if(note_about.value===null||note_about.value===undefined||note_about.value==="")
{
validationError ="Please enter note about the villa decor";
}else{
console.log("all filled");
return true;
}
if(validationError!==""){
alert(validationError);
}
}

render(){
    return(
    <div className="card">
         <p className="text_header">Review Visited Villa </p>
        <p className="text_heading"> Name of the villa </p>
        <input type="text" id="name" name="name" tabIndex="1"
        onKeyDown={this.handleKeyDown.bind(this)} className="input_text" />
        <p className="text_heading"> Date of visit </p>
        <input type="text" id="date" name="date"  tabIndex="2"
        onKeyDown={this.handleKeyDown.bind(this)} className="input_text" />
        <p className="text_heading"> Pincode </p>
        <input type="number" id="pincode" name="pincode"  tabIndex="3"
        onKeyDown={this.handleKeyDown.bind(this)} className="input_text" />
        <p className="text_heading"> Owner's name (optional) </p>
        <input type="text" id="owner" name="owner"  tabIndex="4"
        onKeyDown={this.handleKeyDown.bind(this)} className="input_text" />
        <p className="text_heading"> A note about the surrounding area of the villa</p>
        <input type="text" id="note_surrounding" name="note_surrounding"  tabIndex="5"
        onKeyDown={this.handleKeyDown.bind(this)} className="input_text" />
        <p className="text_heading"> A note about the construction quality of the villa </p>
        <input type="text" id="note_quality" name="note_quality"  tabIndex="6"
        onKeyDown={this.handleKeyDown.bind(this)} className="input_text" />
           <p className="text_heading">A note about the villa decor </p>
        <input type="text" id="note_about" name="note_about"  tabIndex="7"
        onKeyDown={this.handleKeyDown.bind(this)} className="input_text" />
        <div  style={{textAlign:"center"}}>
        <input type="submit" id="submit" name="submit"  tabIndex="8"
        onKeyDown={this.handleKeyDown.bind(this)}  text="submit" className="submit" onClick={this.handleSubmitClick}/>
        </div>
    </div>       
    );
}
}
export default ItemCardView;