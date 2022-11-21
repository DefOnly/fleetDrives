import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function AuthUser(){
    const history = useHistory();
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    const getUser = () => {
        const userString = localStorage.getItem('user');
        const userDetail = JSON.parse(userString);
        return userDetail;
    }
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) => {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
        history.push("/admin");
    }

    const logout = () => {
      localStorage.clear();
      history.push("/auth");
    }

    const http = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return {
        setToken: saveToken,
        token,
        getUser,
        user,
        getToken,
        http,
        logout 
    }
}