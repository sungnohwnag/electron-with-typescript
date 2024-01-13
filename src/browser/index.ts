import {app, BrowserWindow} from 'electron'; 
import {initializeApp} from 'firebase/app';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import * as url from 'url';
import * as path from 'path';

const html = url.format({
  protocol:'file',
  pathname: path.join(__dirname,'../../static/index.html')
});

const firebaseApp = initializeApp ({
    apiKey: "AIzaSyD9GNQMO5b91eG6Ce9RYdiHcaJwR-dVfbc",
    databaseURL: "https://electron-with-typescript-518be-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "electron-with-typescript-518be",
    appId: "1:581486817534:web:8d5f0556179606d2e3b5af",
    measurementId: "G-CJP7NGJVLC"
  });
 
const auth = getAuth(firebaseApp);

auth.onAuthStateChanged((user:{ email:string;})=>{
  console.log(user);
});

app.on('ready',()=>{
    console.log("ready"); 

    const win = new BrowserWindow({
      //renderer에서 require를 쓰기위한 옵션
      webPreferences: {
        nodeIntegration: true,
        contextIsolation:false
      }  
    });
    win.loadURL(html);
    // signInWithEmailAndPassword(auth,"sungnohwang@gmail.com","dhkdsh84!A");
})