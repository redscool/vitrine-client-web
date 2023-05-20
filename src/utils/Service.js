import axios from "axios";
import config from "../config.json";

const SERVER = config.SERVER;

const getUpdatedRoute = (route, body) => {
  let newRoute = route;

  const keys = Object.keys(body);

  if (keys.length > 0) {
    newRoute = newRoute + "?";

    for (let i = 0; i < keys.length; i++) {
      newRoute =
        newRoute +
        encodeURIComponent(keys[i]) +
        "=" +
        encodeURIComponent(body[keys[i]]) +
        "&";
    }

    newRoute = newRoute.slice(0, -1);
  }

  return newRoute;
};

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
    route = getUpdatedRoute(route, body);
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
    route = getUpdatedRoute(route, body);
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
    route = getUpdatedRoute(route, body);
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
