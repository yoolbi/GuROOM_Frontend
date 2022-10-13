import urlJoin from "url-join";
import axios from "axios";

function parseJSON(response) {
  return response
    .json()
    .then((data) => ({ status: response.status, body: data }));
}

export const getAuthorizeAPIMethod = () => {
  console.log("authorize");
  return fetch(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL + "/apps/auth/v1/google/authorize"
    ),
    {
      credentials: "include",
    }
  ).then(parseJSON);
};

export const getUserAPIMethod = async () => {
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

export const postFileSnapshotAPIMethod = async (name) => {
  return await fetch(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL + "/apps/snapshot/v1/google/files"
    ),
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ snapshot_name: name }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  ).then(parseJSON);
};

export const postRefreshAPIMethod = () => {
  return fetch(
    urlJoin(process.env.REACT_APP_BACKEND_URL + "/apps/auth/v1/google/refresh"),
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  ).then(parseJSON);
};

export const getFileSnapshotNamesAPIMethod = () => {
  return fetch(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL,
      "/apps/snapshot/v1/google/files/names"
    ),
    {
      credentials: "include",
    }
  ).then(parseJSON);
};

export const deleteFileSnapshotNamesAPIMethod = (name) => {
  return fetch(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL,
      "/apps/snapshot/v1/google/files"
    ),
    {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({ snapshot_name: name }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  ).then(parseJSON);
};

export const putFileSnapshotNamesAPIMethod = (oldName, newName) => {
  return fetch(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL,
      "/apps/snapshot/v1/google/files"
    ),
    {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        snapshot_name: oldName,
        new_snapshot_name: newName,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  ).then(parseJSON);
};

export const getFileSnapshotAPIMethod = async (
  snapshot_name,
  offset,
  limit,
  folder_id,
  shared_drive,
  my_drive
) => {
  return await axios.get(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL,
      "/apps/snapshot/v1/google/files"
    ),
    {
      credentials: "include",
      withCredentials: true,
      params: {
        snapshot_name: snapshot_name,
        offset: offset,
        limit: limit,
        folder_id: folder_id,
        shared_drive: shared_drive,
        my_drive: my_drive,
      },
    }
  );
};
