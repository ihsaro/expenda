const API_URL = "http://localhost:8000"

export async function performGet(url) {
    const response = await fetch(API_URL + url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response;
}

export async function performPost(url, payload) {
    const response = await fetch(API_URL + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        credentials: "include"
    });
    return response.json();
}