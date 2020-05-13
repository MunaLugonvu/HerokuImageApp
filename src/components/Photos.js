import React, { Component } from 'react'
import firebase from "../firebase"
export default class Photos extends Component {
  constructor(props){
    super(props)
    this.state={
      photos:[]
    }
  }

  showImage(){
    let images=[]
    firebase.firestore().collection(localStorage.getItem("user_id")).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
         

          let imageData={
            url:doc.data().url,
            created:doc.data().added
          }
          images.push(imageData)

      });
  });
  this.setState({ photos: images });
  }
  
  componentDidMount(){
 this.showImage();
  }
  render() {
    const items=this.state.photos;

    return (
    
      <div className="container page-top">
        <div className='row'>
        
      {items.map((i, index)=>(
      <div className="col-lg-3 col-md-4 col-xs-6 thumb">
      <img className="img-thumbnail" src={i.url} key={index} alt="Missing"/>
      </div>
      ))}
      </div>
      </div>
      
      
    )
  }
}