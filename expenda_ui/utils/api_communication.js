import { useRouter } from "next/router";
import { notification } from 'antd';

const API_URL = "http://localhost:8000"

const openNotificationWithIcon = (type, title, description) => {
    notification[type]({
        message: title,
        description: description,
        style: { fontFamily: "'Montserrat', sans-serif" },
        placement: "bottomRight"
    });
};

export async function performGet(url) {
    let response = await fetch(API_URL + url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const jsonResponse = await response.json();
    if (jsonResponse.code && jsonResponse.code == "NOT_AUTHENTICATED") {
        const slideTokenResponse = await performPost("/api/v1/authentication/slide-token/");
        response = await performGet(url);
    }

    return {
        "status": response.status,
        "data": jsonResponse
    };
}

export async function performPost(url, payload) {
    const response = await fetch(API_URL + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        credentials: "include"
    }).catch(exception => {
        return {
            "status": -1,
            "data": exception
        }
    });

    if (response.status == -1) {
        openNotificationWithIcon("error", "Error", "Server error occured, please try again or wait a few minutes before attempting this transaction");
        
        return {
            "status": response.status,
            "data": await response.data
        };
    }

    return {
        "status": response.status,
        "data": await response.json()
    };
}