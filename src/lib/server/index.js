import axios from "axios";

export const post = async (url, payload) => {
  let data = [];
  let message = "";
  let status = false;
  let headers = {};

  headers = {
    ...headers,
    "Content-Type": "application/json",
  };

  try {
    const res = await axios.post(url, payload, {
      headers,
    });

    data = res.data;
    message = res.data.message || res.data.status || "Request successful";
    status = res.status === 200;
  } catch (error) {
    if (error.response) {
      data = error.response.data.data || [];
      message = error.response.data.message || "Error occurred";
      status = error.response.data.status || false;
    } else {
      data = [];
      message = "No server response";
      status = false;
    }
  }

  return { status, message, data };
};
