import { notification } from "antd";

const API_URL = "http://localhost:8000";

const openNotificationWithIcon = (type, title, description) => {
  notification[type]({
    message: title,
    description: description,
    style: { fontFamily: "'Montserrat', sans-serif" },
    placement: "bottomRight",
  });
};

export async function performGet(url) {
  let response = await fetch(API_URL + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return {
    status: response.status,
    data: await response.json(),
  };
}

export async function performPost(url, payload) {
  const response = await fetch(API_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  }).catch((exception) => {
    return {
      status: -1,
      data: exception,
    };
  });

  if (response.status == -1) {
    openNotificationWithIcon(
      "error",
      "Error",
      "Server error occured, please try again or wait a few minutes before attempting this transaction"
    );

    return {
      status: response.status,
      data: await response.json(),
    };
  }

  return {
    status: response.status,
    data: await response.json(),
  };
}
