import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCQYusPCntKpkQ-DHcIvWh-XI4OY7zhM3s",
    authDomain: "photoapp-7e7f1.firebaseapp.com",
    databaseURL: "https://photoapp-7e7f1.firebaseio.com",
    projectId: "photoapp-7e7f1",
    storageBucket: "photoapp-7e7f1.appspot.com",
    messagingSenderId: "10590883131",
    appId: "1:10590883131:web:1e165f1e4c7b5476a63b1e",
    measurementId: "G-HK0D72ZWHM"
  };


  export const firebaseui={
    signInFlow:"popup",
   signInOptions:[
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        
    ]
}
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  


 
 

  export default firebase;