"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const url = require("url");
const path = require("path");
const html = url.format({
    protocol: 'file',
    pathname: path.join(__dirname, '../../static/index.html')
});
const firebaseApp = (0, app_1.initializeApp)({
    apiKey: "AIzaSyD9GNQMO5b91eG6Ce9RYdiHcaJwR-dVfbc",
    databaseURL: "https://electron-with-typescript-518be-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "electron-with-typescript-518be",
    appId: "1:581486817534:web:8d5f0556179606d2e3b5af",
    measurementId: "G-CJP7NGJVLC"
});
const auth = (0, auth_1.getAuth)(firebaseApp);
auth.onAuthStateChanged((user) => {
    console.log(user);
});
electron_1.app.on('ready', () => {
    console.log("ready");
    const win = new electron_1.BrowserWindow({
        //renderer에서 require를 쓰기위한 옵션
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.loadURL(html);
    // signInWithEmailAndPassword(auth,"sungnohwang@gmail.com","dhkdsh84!A");
});
//# sourceMappingURL=index.js.map