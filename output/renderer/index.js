"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
function main() {
    const btnLogin = document.querySelector('#btn-login');
    const btnLogout = document.querySelector('#btn-logout');
    btnLogin.addEventListener('click', () => {
        console.log('#btn-login click');
        const input_email = document.querySelector('#email');
        const input_password = document.querySelector('#password');
        const email = input_email.value;
        const password = input_password.value;
        const loginObj = {
            email,
            password
        };
        electron_1.ipcRenderer.send('request-login', loginObj);
    });
    btnLogout.addEventListener('click', () => {
        electron_1.ipcRenderer.send('request-logout');
    });
    const loginSection = document.querySelector('#login-section');
    const chatSection = document.querySelector('#chat-section');
    const writeSection = document.querySelector('#write-section');
    electron_1.ipcRenderer.on('login-success', () => {
        loginSection.style.display = 'none';
        chatSection.style.display = 'block';
        writeSection.style.display = 'block';
        console.log('login Success');
    });
    electron_1.ipcRenderer.on('logout-success', () => {
        loginSection.style.display = 'block';
        chatSection.style.display = 'none';
        writeSection.style.display = 'none';
        console.log('logout Success');
    });
    electron_1.ipcRenderer.on('login-fail', () => {
        console.log('login fail');
    });
}
document.addEventListener('DOMContentLoaded', main);
//# sourceMappingURL=index.js.map