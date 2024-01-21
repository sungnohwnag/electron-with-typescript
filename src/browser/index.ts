import {app, BrowserWindow, ipcMain} from 'electron'; 
import * as firebase from 'firebase';
import {LoginObj} from '../common/type';
import * as url from 'url';
import * as path from 'path';

const html = url.format({
  protocol:'file',
  pathname: path.join(__dirname,'../../static/index.html')
});

    firebase.default.initializeApp ({
    apiKey: "AIzaSyD9GNQMO5b91eG6Ce9RYdiHcaJwR-dVfbc",
    databaseURL: "https://electron-with-typescript-518be-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "electron-with-typescript-518be",
    appId: "1:581486817534:web:8d5f0556179606d2e3b5af",
    measurementId: "G-CJP7NGJVLC"
  });
  
const auth = firebase.default.auth(); 
const database = firebase.default.database();

auth.onAuthStateChanged((user:{ email:string;})=>{
  // console.log(user);
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
        user = await auth.signInWithEmailAndPassword(arg.email,arg.password);
      } catch(error){
        console.log(error);
      }
      
      if(user){        
        console.log('if');
        event.sender.send('login-success');
        const ref=  database.ref();
        ref.on('value',(snapshot)=>{
          console.log('ref on');
          console.log(snapshot);
        });
      }
      else{
        
        console.log('else');
        event.sender.send('login-fail');
      }
    })

    ipcMain.on('request-logout',async(event)=>{
      let user = null;
      try{
      user = await auth.signOut();
      }catch(error){
        console.log(error);
      }
      
      event.sender.send('logout-success');
    });
    // signInWithEmailAndPassword(auth,"sungnohwang@gmail.com","dhkdsh84!A");
})