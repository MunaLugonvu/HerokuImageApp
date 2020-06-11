import React, { useEffect, useState } from 'react';
import firebase from '../firebase';


export default function Photos() {
  const [photos, setPhotos] = useState([]);

  async function showImages() {
    let images = [];
     await firebase
      .firestore()
      .collection(localStorage.getItem('user_id'))
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const imageData = {
            url: doc.data().url,
            created: doc.data().added,
          };
          images.push(imageData);
        });
      });
    setPhotos(images);
  }

  useEffect(() => {
    showImages();
  }, []);

 
  return (
    <div className="container page-top">
      <div className="row">
        {photos.map((i, index) => (
          <div className="col-lg-3 col-md-4 col-xs-6 thumb">
            <img
              className="img-thumbnail"
              src={i.url}
              key={index}
              alt="Missing"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
