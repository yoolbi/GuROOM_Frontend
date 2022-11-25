import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import { DataGrid } from "@mui/x-data-grid";
import { getFileFolderSharingDifferencesDropboxAPIMethod } from "../api/client";

//Modal to show details for file-folder sharing differences
const SharingDifferenceModalDropbox = ({
  // eslint-disable-next-line react/prop-types
  closeSharingDifferenceModal,
  // eslint-disable-next-line react/prop-types
  selectedFileFolderSharingDifferences,
  // eslint-disable-next-line react/prop-types
  fileSnapshot,
}) => {
  let differentPermissions = [];

  //get file-folder sharing differences info
  useEffect(() => {
    getFileFolderSharingDifferencesDropboxAPIMethod(
      fileSnapshot,
      // eslint-disable-next-line react/prop-types
      selectedFileFolderSharingDifferences["id"]
    ).then((res) => {
      console.log(res);
      for (let key in res.data) {
        //store data of different permissions
        if (key === "additional_folder_permissions") {
          res.data[key].map((data) => {
            differentPermissions.push({
              id: data["id"],
              name: data["emailAddress"],
              folderPermission: data["role"],
              filePermission: "X",
            });
          });
        } else if (key === "additional_file_permissions") {
          //store data of additional file permissions
          res.data[key].map((data) => {
            differentPermissions.push({
              id: data["id"],
              name: data["emailAddress"],
              folderPermission: "X",
              filePermission: data["role"],
            });
          });
        } else if (key === "changed_permissions") {
          //store data of changed permissions
          res.data[key].map((data) => {
            differentPermissions.push({
              id: data["from"]["id"],
              name: data["from"]["emailAddress"],
              folderPermission: data["from"]["role"],
              filePermission: data["to"]["role"],
            });
          });
        }
      }
      setRows(differentPermissions);
    });
  }, []);

  const columns = [
    { field: "name", headerName: "Name", width: 250 },
    { field: "folderPermission", headerName: "Folder Permission", width: 250 },
    { field: "filePermission", headerName: "File Permission", width: 250 },
  ];

  const [rows, setRows] = useState([
    {
      id: 1,
    },
  ]);

  console.log(selectedFileFolderSharingDifferences);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ margin: "0px" }}>File-Folder Sharing Differences</h2>
        <ClearIcon
          fontSize="medium"
          onClick={closeSharingDifferenceModal}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div style={{ marginTop: "30px" }}>
        <TextField
          id="outlined-read-only-input"
          label="Folder Name"
          /* eslint-disable-next-line react/prop-types */
          defaultValue={selectedFileFolderSharingDifferences["path"]
            // eslint-disable-next-line react/prop-types
            .split("/")
            .slice(-2, -1)}
          InputProps={{
            readOnly: true,
          }}
        />
        <img
          src="/img/arrow.png"
          style={{
            width: "40px",
            height: "23px",
            margin: "16px 10px 0px 10px",
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="File Name"
          /* eslint-disable-next-line react/prop-types */
          defaultValue={selectedFileFolderSharingDifferences["name"]}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div style={{ height: 550, width: "100%", marginTop: "10px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </div>
  );
  // eslint-disable-next-line no-unreachable
  closeSharingDifferenceModal();
};

export default SharingDifferenceModalDropbox;
