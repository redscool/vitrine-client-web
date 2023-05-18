import axios from "axios";
import config from "../config.json";

const SERVER = config.SERVER;

export const auth_request_with_access_token = async (
  method,
  route,
  body,
  onSuccess,
  onError
) => {
  const token = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: token,
    },
  };

  if (method === "get") {
    body = config;
  }

  axios[method](`${SERVER}${route}`, body, config)
    .then((response) => {
      onSuccess(response);
    })
    .catch((err) => {
      onError(err);
    });
};

export const auth_request = async (method, route, body, onSuccess, onError) => {
  const config = {};

  if (method === "get") {
    body = config;
  }

  axios[method](`${SERVER}${route}`, body, config)
    .then((response) => {
      onSuccess(response);
    })
    .catch((err) => {
      onError(err);
    });
};

export const resource_request_with_access_token = async (
  method,
  route,
  body,
  onSuccess,
  onError
) => {
  const token = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: token,
    },
  };

  if (method === "get") {
    body = config;
  }

  axios[method](`${SERVER}${route}`, body, config)
    .then((response) => {
      onSuccess(response);
    })
    .catch((err) => {
      onError(err);
    });
};
