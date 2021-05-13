import firebase from 'firebase/app'
import "firebase/auth";



  var firebaseConfig = {
    apiKey: "AIzaSyDgSIO91IlWj6JmZIFPzMaB-5qqcsjvtFA",
    authDomain: "ecommerce-fa17b.firebaseapp.com",
    projectId: "ecommerce-fa17b",
    storageBucket: "ecommerce-fa17b.appspot.com",
    messagingSenderId: "402562495089",
    appId: "1:402562495089:web:368d339ec3a77317b461d0",
    measurementId: "G-PLJNLWY0ZW"
  };
  firebase.initializeApp(firebaseConfig);


   const auth = firebase.auth()
   const googleauthProvider = new firebase.auth.GoogleAuthProvider()


  export { auth,googleauthProvider } 
