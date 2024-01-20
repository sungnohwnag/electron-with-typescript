import {app, BrowserWindow, ipcMain} from 'electron'; 
import {initializeApp} from 'firebase/app';
import {getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {LoginObj} from '../common/type';
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
      width:500,
      minWidth:500,
      maxWidth:1500,
      height:700,
      minHeight:700,
      maxHeight:700,
      maximizable:false,
      center:true,
      //renderer에서 require를 쓰기위한 옵션
      webPreferences: {
        nodeIntegration: true,
        contextIsolation:false
      }  
    });
    win.loadURL(html);

    ipcMain.on('request-login',async (event,arg:LoginObj)=>{
      console.log(arg);
      let user = null;

      try{
        user = await signInWithEmailAndPassword(auth,arg.email,arg.password);
      } catch(error){
        console.log(error);
      }

      if(user){
        event.sender.send('login-success');
      }
      else{
        event.sender.send('login-fail');
      }
    })

    ipcMain.on('request-logout',async(event)=>{
      let user = null;
      try{
      user = await signOut(auth);
      }catch(error){
        console.log(error);
      }
      
      event.sender.send('logout-success');
    });
    // signInWithEmailAndPassword(auth,"sungnohwang@gmail.com","dhkdsh84!A");
})