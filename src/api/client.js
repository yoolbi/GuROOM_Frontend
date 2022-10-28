import urlJoin from "url-join";
import axios from "axios";

function parseJSON(response) {
  return response
    .json()
    .then((data) => ({ status: response.status, body: data }));
}

//Google
//Authorize Request, retrieves url of google login. Create Google Auth.
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

//Retrieves user information, saves it into internal database if first time user. Get User.
export const getUserAPIMethod = async () => {
  return fetch(
    urlJoin(process.env.REACT_APP_BACKEND_URL, "/apps/auth/v1/google/user"),
    {
      credentials: "include",
    }
  ).then(parseJSON);
};

//post access token to login
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

//Refresh token
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

//logout user
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

//delete the user account
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

//Dropbox
//Authorize Request, retrieves url of dropbox login. Create Dropbox Auth.
export const getAuthorizeDropboxAPIMethod = () => {
  console.log("authorize");
  return fetch(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL + "/apps/auth/v1/dropbox/authorize"
    ),
    {
      credentials: "include",
    }
  ).then(parseJSON);
};

//Retrieves user information, saves it into internal database if first time user. Get User.
export const getUserDropboxAPIMethod = async () => {
  return fetch(
    urlJoin(process.env.REACT_APP_BACKEND_URL, "/apps/auth/v1/dropbox/user"),
    {
      credentials: "include",
    }
  ).then(parseJSON);
};

//post access token to login
export const postAccessTokenDropboxAPIMethod = (code) => {
  return fetch(
    urlJoin(process.env.REACT_APP_BACKEND_URL + "/apps/auth/v1/dropbox/login"),
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

//Refresh token
export const postRefreshDropboxAPIMethod = () => {
  return fetch(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL + "/apps/auth/v1/dropbox/refresh"
    ),
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  ).then(parseJSON);
};

//logout user
export const deleteLogoutDropboxAPIMethod = () => {
  return fetch(
    urlJoin(process.env.REACT_APP_BACKEND_URL, "/apps/auth/v1/dropbox/logout"),
    {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  ).then(parseJSON);
};

//delete the user account
export const deleteRevokeDropboxAPIMethod = () => {
  return fetch(
    urlJoin(process.env.REACT_APP_BACKEND_URL, "/apps/auth/v1/dropbox/revoke"),
    {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  ).then(parseJSON);
};

//Take a file snapshot
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

//Get list of file snapshot names
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

//Delete a file snapshot name
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

//Edit a file snapshot name
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

//get all files of the selected file snapshot
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

//Get shared drives
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

//Get the results of search queries
export const getSearchAPIMethod = async (snapshot_name, query) => {
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

//Get file-folder sharing differences
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

//get differences of two snapshots. Comparing snapshots.
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

//Create a group
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

//Get groups
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

//Get unique members of a file snapshot
export const getMembersAPIMethod = async (snapshot_name, is_groups) => {
  return await axios.get(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL,
      "/apps/snapshot/v1/google/files/members"
    ),
    {
      credentials: "include",
      withCredentials: true,
      params: {
        snapshot_name: snapshot_name,
        is_groups: is_groups,
      },
    }
  );
};

//Get query logs
export const getQueriesAPIMethod = () => {
  console.log("authorize");
  return fetch(
    urlJoin(
      process.env.REACT_APP_BACKEND_URL + "/apps/snapshot/v1/google/queries"
    ),
    {
      credentials: "include",
    }
  ).then(parseJSON);
};
