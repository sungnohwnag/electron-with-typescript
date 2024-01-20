"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        width: 500,
        minWidth: 500,
        maxWidth: 1500,
        height: 700,
        minHeight: 700,
        maxHeight: 700,
        maximizable: false,
        center: true,
        //renderer에서 require를 쓰기위한 옵션
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.loadURL(html);
    electron_1.ipcMain.on('request-login', (event, arg) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(arg);
        let user = null;
        try {
            user = yield (0, auth_1.signInWithEmailAndPassword)(auth, arg.email, arg.password);
        }
        catch (error) {
            console.log(error);
        }
        if (user) {
            event.sender.send('login-success');
        }
        else {
            event.sender.send('login-fail');
        }
    }));
    electron_1.ipcMain.on('request-logout', (event) => __awaiter(void 0, void 0, void 0, function* () {
        let user = null;
        try {
            user = yield (0, auth_1.signOut)(auth);
        }
        catch (error) {
            console.log(error);
        }
        event.sender.send('logout-success');
    }));
    // signInWithEmailAndPassword(auth,"sungnohwang@gmail.com","dhkdsh84!A");
});
//# sourceMappingURL=index.js.map