const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const fetch = require('node-fetch');

async function postData(url = '', data = {}) {
    try {
        response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });

        return response.json();
    } catch (err) {
        return JSON.stringify(err);
    }
}

async function postDataWithAPIKey(url = '', data = {}, apikey) {
    try {
        response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': apikey
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });

        return response.json();
    } catch (err) {
        return JSON.stringify(err);
    }
}

async function getData(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
    return response.json();
}

async function getDataWithAPIKey(url = '', apikey) {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apikey
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
    return response.json();
}

function generateAccessToken(id, email, role) {
    return accessToken = jwt.sign(
        {
            id: id,
            email: email,
            role: role
        },
        JWT_SECRET,
        {
            expiresIn: "31d",
        }
    );
}

function generateRandomHash() {
    return CryptoJS.lib.WordArray.random(16).toString();
}

function getCurrentTimeString() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

module.exports = {
    getData,
    getDataWithAPIKey,
    generateAccessToken,
    generateRandomHash,
    postData,
    postDataWithAPIKey,
    getCurrentTimeString
};
