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

export const deleteLogoutAPIMethod = () => {
  return fetch(
    urlJoin(process.env.REACT_APP_BACKEND_URL, "/apps/auth/v1/google/logout"),
    {
      credentials: "include",
      method: "DELETE",
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
  my_drive,
  shared_with_me,
  shared_drive,
  folder_id
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
        my_drive: my_drive,
        shared_with_me: shared_with_me,
        shared_drive: shared_drive,
        folder_id: folder_id,
      },
    }
  );
};

export const getSharedDriveAPIMethod = async (snapshot_name) => {
  return await axios.get(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL,
      "/apps/snapshot/v1/google/files/drives"
    ),
    {
      credentials: "include",
      withCredentials: true,
      params: {
        snapshot_name: snapshot_name,
      },
    }
  );
};

export const getFileFolderSharingDifferencesSearchAPIMethod = async (
  snapshot_name,
  query
) => {
  return await axios.get(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL,
      "/apps/snapshot/v1/google/files/search"
    ),
    {
      credentials: "include",
      withCredentials: true,
      params: {
        snapshot_name: snapshot_name,
        query: query,
      },
    }
  );
};

export const getFileFolderSharingDifferencesAPIMethod = async (
  snapshot_name,
  file_id
) => {
  return await axios.get(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL,
      "/apps/snapshot/v1/google/files/differences/sharing"
    ),
    {
      credentials: "include",
      withCredentials: true,
      params: {
        snapshot_name: snapshot_name,
        file_id: file_id,
      },
    }
  );
};

export const getCompareSnapshotsAPIMethod = async (
  base_snapshot_name,
  compare_snapshot_name
) => {
  return await axios.get(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL,
      "/apps/snapshot/v1/google/files/differences"
    ),
    {
      credentials: "include",
      withCredentials: true,
      params: {
        base_snapshot_name: base_snapshot_name,
        compare_snapshot_name: compare_snapshot_name,
      },
    }
  );
};

// export const postGroupAPIMethod = (
//   file,
//   group_name,
//   group_email,
//   create_time
// ) => {
//   var data = new FormData();
//   data.append("file", file);
//   data.append("group_name", group_name);
//   data.append("group_email", group_email);
//   data.append("create_time", create_time);
//   return fetch(
//     urlJoin(
//       process.env.REACT_APP_BACKEND_URL + "/apps/snapshot/v1/google/groups"
//     ),
//     {
//       credentials: "include",
//       method: "POST",
//       body: data,
//       // body: JSON.stringify({
//       //   file: file,
//       //   group_name: group_name,
//       //   group_email: group_email,
//       //   create_time: create_time,
//       // }),
//       headers: {
//         "Content-Type": "form-data; charset=UTF-8",
//       },
//     }
//   ).then(parseJSON);
// };

export const postGroupAPIMethod = (formData) => {
  return fetch(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL + "/apps/snapshot/v1/google/groups"
    ),
    {
      credentials: "include",
      method: "POST",
      body: formData,
    }
  ).then(parseJSON);
};

export const getGroupAPIMethod = async () => {
  return fetch(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL,
      "/apps/snapshot/v1/google/groups"
    ),
    {
      credentials: "include",
    }
  ).then(parseJSON);
};
