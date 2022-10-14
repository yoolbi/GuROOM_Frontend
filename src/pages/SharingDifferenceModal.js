import React from "react";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import { DataGrid } from "@mui/x-data-grid";

const SharingDifferenceModal = ({
  // eslint-disable-next-line react/prop-types
  closeSharingDifferenceModal,
  // eslint-disable-next-line react/prop-types
  selectedFileFolderSharingDifferences,
}) => {
  console.log(selectedFileFolderSharingDifferences);
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "folderPermission", headerName: "Folder Permission", width: 250 },
    { field: "filePermission", headerName: "File Permission", width: 250 },
  ];

  const rows = [
    {
      id: 1,
    },
  ];

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
          defaultValue="Folder Name"
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
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </div>
    </div>
  );
  // eslint-disable-next-line no-unreachable
  closeSharingDifferenceModal();
};

export default SharingDifferenceModal;
