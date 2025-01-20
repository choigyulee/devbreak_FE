import {Cookies} from "react-cookie";

const cookies = new Cookies()


export const setCookie = (name, value, expiresInDays = 7) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + expiresInDays);
    cookies.set(name, value, { expires, path: '/' });  
};

export const getCookie = (name) =>{
    return cookies.get(name)
}

export const removeCookie = (name)=>{
    cookies.remove(name, { path: '/' }); 
}