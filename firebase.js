import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDTpxI07yw7wOR70EDfcdGSDq_wqGuAnC8",
  authDomain: "signal-build-2c396.firebaseapp.com",
  projectId: "signal-build-2c396",
  storageBucket: "signal-build-2c396.appspot.com",
  messagingSenderId: "552429109923",
  appId: "1:552429109923:web:acc55a4ca5edd77ce3b516"
};

let app;

if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}
else{
  app=firebase.app();
}

const db= app.firestore();
const auth= firebase.auth();
export {db,auth};
