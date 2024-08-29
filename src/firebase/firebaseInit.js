import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBaF-K8OzIHGPM0JD1HQ_l_YN0AC01Mnik",
  authDomain: "fireblogs-dea01.firebaseapp.com",
  projectId: "fireblogs-dea01",
  storageBucket: "fireblogs-dea01.appspot.com",
  messagingSenderId: "902758488864",
  appId: "1:902758488864:web:469497c9c84a304a41d545"
};

const app = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp }
export default app.firestore()