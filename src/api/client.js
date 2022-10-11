import urlJoin from "url-join";
function parseJSON(response) {
  return response
    .json()
    .then((data) => ({ status: response.status, body: data }));
}

export const getAuthorizeAPIMethod = () => {
  return fetch(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL + "/apps/auth/v1/google/authorize"
    ),
    {
      credentials: "include",
    }
  ).then(parseJSON);
};

export const getUserAPIMethod = () => {
  return fetch(
    urlJoin(process.env.REACT_APP_BACKEND_URL, "/apps/auth/v1/google/user"),
    {
      credentials: "include",
    }
  ).then(parseJSON);
};

export const postAccessTokenAPIMethod = (code) => {
  return fetch(
    urlJoin(process.env.REACT_APP_BACKEND_URL + "/apps/auth/v1/google/login"),
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ code: code }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  ).then(parseJSON);
};

export const deleteRevokeAPIMethod = () => {
  return fetch(
    urlJoin(process.env.REACT_APP_BACKEND_URL, "/apps/auth/v1/google/revoke"),
    {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  ).then(parseJSON);
};
