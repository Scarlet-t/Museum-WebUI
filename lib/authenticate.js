// test accounts:
// {"userName": "moomer", "password": "1234", "password2": "1234"}
// {"userName": "poobie", "password": "moooo:3", "password2": "moooo:3"}

import { jwtDecode } from 'jwt-decode';

//stores token locally
// localstorage is a read-ony property of the window interface that allows u to access a  storage object for the documents origin
// sotred data is saved across browser sessions
// so what happens is that the value of thetoken is stored in the browser for later retrieval
// this is NOT the same as keeping it in stored memory as we do not want the user to be logged out just because the page is refershed
// in browser dev console this is under Application>Storage
function setToken(token) {
    localStorage.setItem('access_token', token);
  }
  

//and this one removes the record w key 'access_token'
export function removeToken() {
    localStorage.removeItem('access_token');
}

export async function registerUser(user, password, password2) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({userName: user, password: password, password2: password2}),
        headers: {
            'content-type': 'application/json'
        },
    });

    const data = await res.json();

    if (res.status == 200) {
        return true;
    }
    else {
        throw new Error(data.message);
    }
}

// fetch from api post /login
// if returns 200 (user, password match ones on db i think??) store toke nadn return true
// otherwise throw error
export async function authenticateUser(user, password) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ userName: user, password: password }),
      headers: {
        'content-type': 'application/json',
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
      setToken(data.token);
      return true;
    } else {
      throw new Error(data.message);
    }
  }

// this one now reads the token its really just the getter but with jwtDecode decoding it
// jwtdecode is just ablack box now i dont have to think about it i dont need to tknow i dont NEEDDD
export function getToken() {
    try {
        return localStorage.getItem('access_token');
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

//so this one will actually decode it i guess
export function getDecodedToken() {
    try{
        const token = getToken();
        return token ? jwtDecode(token) : null;
    }
    catch(err) {
        return null;
    }
}

//literally just calls getToken() and returns true if the value is truthy, and false if not
export function isAuthenticated() {
    const token = getToken();
    return token? true : false;
}