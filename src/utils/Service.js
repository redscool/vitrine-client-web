import axios from 'axios';
import config from '../config.json';

const SERVER = config.SERVER;
const FILE_SERVER = config.FILE_SERVER;

const routeUpdateRequired = (method) => {
	return method === 'get' || method === 'delete';
};

const getUpdatedRoute = (route, body) => {
	let newRoute = route;

	const keys = Object.keys(body);

	if (keys.length > 0) {
		newRoute = newRoute + '?';

		for (let i = 0; i < keys.length; i++) {
			newRoute =
				newRoute +
				encodeURIComponent(keys[i]) +
				'=' +
				encodeURIComponent(body[keys[i]]) +
				'&';
		}

		newRoute = newRoute.slice(0, -1);
	}

	return newRoute;
};
const refresh_access_token = async (navigate) => {
	const refreshToken = localStorage.getItem('refreshToken');
	const userId = localStorage.getItem('userId');
	if (!userId || !refreshToken) {
		navigate('/login');
		return;
	}
	try {
		const data = await axios.post(`${SERVER}/api/auth/access/newAccessToken`, {
			userId,
			refreshToken,
		});
		localStorage.setItem('accessToken', data.data.accessToken);
		return true;
	} catch {
		navigate('/login');
	}
};
export const auth_request_with_access_token = async (
	method,
	route,
	body,
	onSuccess,
	onError
) => {
	const token = localStorage.getItem('accessToken');

	const config = {
		headers: {
			Authorization: token,
		},
	};

	if (routeUpdateRequired(method)) {
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

	if (routeUpdateRequired(method)) {
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

export const resource_request_with_access_token =
	(navigate) =>
	async (method, route, body, onSuccess, onError, level = 0) => {
		const token = localStorage.getItem('accessToken');
		const config = {
			headers: {
				Authorization: token,
			},
		};
		if (routeUpdateRequired(method)) {
			route = getUpdatedRoute(route, body);
			body = config;
		}

		axios[method](`${SERVER}${route}`, body, config)
			.then((response) => {
				onSuccess(response);
			})
			.catch(async (err) => {
				if (err?.response?.data?.invalid) {
					await refresh_access_token(navigate);
					if (level >= 5) onError(err);
					else
						resource_request_with_access_token(navigate)(
							method,
							route,
							body,
							onSuccess,
							onError,
							level + 1
						);
				} else onError(err);
			});
	};

export const file_server_request = async (
  method,
  route,
  body,
  onSuccess,
  onError,
  formData = true
) => {
  const token = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: token,
      ...(formData && { "Content-Type": "multipart/form-data" }),
    },
  };

  if (routeUpdateRequired(method)) {
    route = getUpdatedRoute(route, body);
    body = config;
  }
  console.log(body);

  axios[method](`${FILE_SERVER}${route}`, body, config)
    .then((response) => {
      onSuccess(response);
    })
    .catch((err) => {
      onError(err);
    });
};
