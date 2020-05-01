import React, { Component } from 'react';
import firebase from 'firebase';
import Progress from './progress';

export default class Upload extends Component {

    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props)
        this.state = {
            file: null,
            progress: 0,
            user_id:localStorage.getItem("user_id"),
            isUploading: null,
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
        this.removeFile = this.removeFile.bind(this)
    }

    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
          this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
         
        }
        this.setState({file:this.state.file})
      }
    uploadFiles(e) {
     
      for (let i = 0; i < this.fileObj[0].length; i++) {
        e.preventDefault()
        console.log(this.state.file)
        const uploadTask = firebase.storage().ref(`images/${this.fileObj[0].item(i).name}`)
        .put(this.fileObj[0].item(i));
        uploadTask.on("state_changed",
        (snapshot) => {
          const isUploading = true;
          this.setState({ isUploading });
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({ progress });
         

          
        },
        (error) => {
        },
        () => {
          firebase.storage().ref("images")
            .child(this.fileObj[0].item(i).name)
            .getDownloadURL()
            .then((url) => {
                const isUploading = false;
              this.setState({ isUploading });
              const image={
                  url:url,
                  added:new Date()
              }
              
              firebase.firestore().collection(this.state.user_id).add(image).then(res=>{
                this.props.history.push("/myphotos");
              });
  
            });
        });
     }
     
    
  }
  removeFile(e){
    
  }

    render() {
      const previewStyle = {
        widith: "300px",
        height: "300px"
      }
      const style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      };
        return (
          <div style={style}>
          
          <div className="mt-5 text-center form-group">
         {this.state.isUploading ? (<Progress percentage={this.state.progress} />) : "" }
         
          
         <h5 className="text-center">Upload your Images</h5>
         
            <form>
                <div className="form-group multi-preview">
                    {(this.fileArray || []).map(url => (
                        <img src={url} alt="..." style={previewStyle} />
                    ))}
                </div>

                <div className="form-group">
                    <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
                </div>
                <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button>
            </form >
        

            </div>
            
            </div>
            
        )
    }
}