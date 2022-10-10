function parseJSON(response) {
  return response.json();
}

export const getAuthorizeAPIMethod = () => {
  return fetch("https://guroom.live/apps/auth/v1/google/authorize", {
    credentials: "include",
  }).then(parseJSON);
};

export const getUserAPIMethod = () => {
  return fetch("https://guroom.live/apps/auth/v1/google/user", {
    credentials: "include",
  }).then(parseJSON);
};
