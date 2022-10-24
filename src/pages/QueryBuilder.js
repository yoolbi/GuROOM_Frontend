import React from "react";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Autocomplete,
  Switch,
  Button,
} from "@mui/material";

const sharingTypes = ["None", "Anything", "Individual", "Domain"];

// eslint-disable-next-line react/prop-types
const QueryBuilder = ({ handleCloseSearchFilter, setSearchInput }) => {
  let query = "";
  const [sharedDrive, setSharedDrive] = React.useState("");
  const [owner, setOwner] = React.useState("");
  const [creator, setCreator] = React.useState("");
  const [sharedFrom, setSharedFrom] = React.useState("");
  const [sharedTo, setSharedTo] = React.useState("");
  const [name, setName] = React.useState("");
  // const [readable, setReadable] = React.useState("");
  // const [writeable, setWriteable] = React.useState("");
  // const [sharable, setSharable] = React.useState("");
  const [path, setPath] = React.useState("");
  const [pathSelect, setPathSelect] = React.useState("");
  const [sharingTypeSelect, setSharingTypeSelect] = React.useState("");
  const [individual, setIndividual] = React.useState("");
  const [domain, setDomain] = React.useState("");

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    {
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
    },
    {
      title: "Star Wars: Episode V - The Empire Strikes Back",
      year: 1980,
    },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    {
      title: "The Lord of the Rings: The Two Towers",
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: "Goodfellas", year: 1990 },
    { title: "The Matrix", year: 1999 },
    { title: "Seven Samurai", year: 1954 },
    {
      title: "Star Wars: Episode IV - A New Hope",
      year: 1977,
    },
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
    { title: "Once Upon a Time in the West", year: 1968 },
    { title: "American History X", year: 1998 },
    { title: "Interstellar", year: 2014 },
    { title: "Casablanca", year: 1942 },
    { title: "City Lights", year: 1931 },
    { title: "Psycho", year: 1960 },
    { title: "The Green Mile", year: 1999 },
    { title: "The Intouchables", year: 2011 },
    { title: "Modern Times", year: 1936 },
    { title: "Raiders of the Lost Ark", year: 1981 },
    { title: "Rear Window", year: 1954 },
    { title: "The Pianist", year: 2002 },
    { title: "The Departed", year: 2006 },
    { title: "Terminator 2: Judgment Day", year: 1991 },
    { title: "Back to the Future", year: 1985 },
    { title: "Whiplash", year: 2014 },
    { title: "Gladiator", year: 2000 },
    { title: "Memento", year: 2000 },
    { title: "The Prestige", year: 2006 },
    { title: "The Lion King", year: 1994 },
    { title: "Apocalypse Now", year: 1979 },
    { title: "Alien", year: 1979 },
    { title: "Sunset Boulevard", year: 1950 },
    {
      title:
        "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
      year: 1964,
    },
    { title: "The Great Dictator", year: 1940 },
    { title: "Cinema Paradiso", year: 1988 },
    { title: "The Lives of Others", year: 2006 },
    { title: "Grave of the Fireflies", year: 1988 },
    { title: "Paths of Glory", year: 1957 },
    { title: "Django Unchained", year: 2012 },
    { title: "The Shining", year: 1980 },
    { title: "WALL·E", year: 2008 },
    { title: "American Beauty", year: 1999 },
    { title: "The Dark Knight Rises", year: 2012 },
    { title: "Princess Mononoke", year: 1997 },
    { title: "Aliens", year: 1986 },
    { title: "Oldboy", year: 2003 },
    { title: "Once Upon a Time in America", year: 1984 },
    { title: "Witness for the Prosecution", year: 1957 },
    { title: "Das Boot", year: 1981 },
    { title: "Citizen Kane", year: 1941 },
    { title: "North by Northwest", year: 1959 },
    { title: "Vertigo", year: 1958 },
    {
      title: "Star Wars: Episode VI - Return of the Jedi",
      year: 1983,
    },
    { title: "Reservoir Dogs", year: 1992 },
    { title: "Braveheart", year: 1995 },
    { title: "M", year: 1931 },
    { title: "Requiem for a Dream", year: 2000 },
    { title: "Amélie", year: 2001 },
    { title: "A Clockwork Orange", year: 1971 },
    { title: "Like Stars on Earth", year: 2007 },
    { title: "Taxi Driver", year: 1976 },
    { title: "Lawrence of Arabia", year: 1962 },
    { title: "Double Indemnity", year: 1944 },
    {
      title: "Eternal Sunshine of the Spotless Mind",
      year: 2004,
    },
    { title: "Amadeus", year: 1984 },
    { title: "To Kill a Mockingbird", year: 1962 },
    { title: "Toy Story 3", year: 2010 },
    { title: "Logan", year: 2017 },
    { title: "Full Metal Jacket", year: 1987 },
    { title: "Dangal", year: 2016 },
    { title: "The Sting", year: 1973 },
    { title: "2001: A Space Odyssey", year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: "Toy Story", year: 1995 },
    { title: "Bicycle Thieves", year: 1948 },
    { title: "The Kid", year: 1921 },
    { title: "Inglourious Basterds", year: 2009 },
    { title: "Snatch", year: 2000 },
    { title: "3 Idiots", year: 2009 },
    { title: "Monty Python and the Holy Grail", year: 1975 },
  ];

  const handleChangeSharedDrive = (event) => {
    setSharedDrive(event.target.value);
  };

  const handleChangeOwner = (event) => {
    setOwner(event.target.value);
  };

  const handleChangeCreator = (event) => {
    setCreator(event.target.value);
  };

  const handleChangeSharedFrom = (event) => {
    setSharedFrom(event.target.value);
  };

  const handleChangeSharedTo = (event) => {
    setSharedTo(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  let readable = "";
  const handleChangeReadable = (event) => {
    console.log(event.target.innerText);
    if (readable === "") {
      readable = event.target.innerText;
    } else {
      readable = readable + "," + event.target.innerText;
    }
  };

  let writable = "";
  const handleChangeWritable = (event) => {
    if (writable === "") {
      writable = event.target.innerText;
    } else {
      writable = writable + "," + event.target.innerText;
    }
  };

  let sharable = "";
  const handleChangeSharable = (event) => {
    if (sharable === "") {
      sharable = event.target.innerText;
    } else {
      sharable = sharable + "," + event.target.innerText;
    }
  };

  const handleChangePath = (event) => {
    setPath(event.target.value);
  };
  const handleChangePathType = (event) => {
    setPathSelect(event.target.value);
  };

  const handleChangeSharingType = (event) => {
    setSharingTypeSelect(event.target.value);
  };

  const [checkedMyDrive, setCheckedMyDrive] = React.useState(true);
  const handleChangeCheckboxMyDrive = (event) => {
    setCheckedMyDrive(event.target.checked);
    setCheckedSharedDrive(!event.target.checked);
  };

  const [checkedSharedDrive, setCheckedSharedDrive] = React.useState(false);
  const handleChangeCheckboxSharedDrive = (event) => {
    setCheckedSharedDrive(event.target.checked);
    setCheckedMyDrive(!event.target.checked);
  };

  const [checkedGroup, setCheckedGroup] = React.useState(false);
  const handleChangeCheckedGroup = (event) => {
    setCheckedGroup(event.target.checked);
  };

  const handleChangeIndividual = (event) => {
    setIndividual(event.target.value);
  };

  const handleChangeDomain = (event) => {
    setDomain(event.target.value);
  };

  const handleClickGenerate = () => {
    checkedMyDrive && (query = query + "drive:MyDrive and ");
    checkedSharedDrive && (query = query + "drive:" + sharedDrive + " and ");
    owner && (query = query + "owner:" + owner + " and ");
    creator && (query = query + "creator:" + creator + " and ");
    sharedFrom && (query = query + "sharedFrom:" + sharedFrom + " and ");
    sharedTo && (query = query + "sharedTo:" + sharedTo + " and ");
    readable && (query = query + "readable:" + readable + " and ");
    writable && (query = query + "writable:" + writable + " and ");
    sharable && (query = query + "sharable:" + sharable + " and ");
    name && (query = query + "name:" + name + " and ");
    pathSelect === "inFolder" && (query = query + "inFolder:" + path + " and ");
    pathSelect === "folder" && (query = query + "folder:" + path + " and ");
    sharingTypeSelect === "None" && (query = query + "sharing:none and ");
    sharingTypeSelect === "Anyone" && (query = query + "sharing:anyone and ");
    sharingTypeSelect === "Individual" &&
      (query = query + "sharing:individual:" + individual + " and ");
    sharingTypeSelect === "Domain" &&
      (query = query + "sharing:domain:" + domain + " and ");

    query = query.slice(0, -5);
    console.log(query);
    query = setSearchInput(query);
    handleCloseSearchFilter();
  };

  return (
    <div style={{ height: "100%" }}>
      <div style={{ height: 575, overflowY: "scroll" }}>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={checkedGroup}
                onChange={handleChangeCheckedGroup}
              />
            }
            label="Group"
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedMyDrive}
                  onChange={handleChangeCheckboxMyDrive}
                />
              }
              label="My Drive"
            />

            <FormControlLabel
              style={{ marginRight: "5px" }}
              control={
                <Checkbox
                  checked={checkedSharedDrive}
                  onChange={handleChangeCheckboxSharedDrive}
                />
              }
              label="Shared Drive"
            />
            {checkedSharedDrive && (
              <TextField
                label="Shared Drive Name"
                id="outlined-start-adornment"
                sx={{ width: "300px", marginBottom: "15px" }}
                value={sharedDrive}
                onChange={handleChangeSharedDrive}
              />
            )}
          </div>
        </div>
        <div>
          <div>
            <TextField
              id="outlined-textareas"
              label="Owner"
              placeholder="username"
              multiline
              value={owner}
              onChange={handleChangeOwner}
              sx={{ width: "545px", marginBottom: "15px" }}
            />
          </div>
          <div>
            <TextField
              id="outlined-textareas"
              label="Creator"
              placeholder="username"
              multiline
              value={creator}
              onChange={handleChangeCreator}
              sx={{ width: "545px", marginBottom: "15px" }}
            />
          </div>
          <div>
            <TextField
              label="shared"
              id="outlined-start-adornment"
              sx={{ width: "545px", marginBottom: "15px" }}
              value={sharedFrom}
              onChange={handleChangeSharedFrom}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">From</InputAdornment>
                ),
              }}
            />
          </div>

          <div>
            <TextField
              label="shared"
              id="outlined-start-adornment"
              sx={{ width: "545px", marginBottom: "15px" }}
              value={sharedTo}
              onChange={handleChangeSharedTo}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">To</InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            onChange={handleChangeReadable}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Readable by"
                placeholder="Email/Name"
                sx={{ width: "545px", marginBottom: "20px" }}
              />
            )}
          />
          <Autocomplete
            multiple
            id="tags-outlined"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            onChange={handleChangeWritable}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Writable by"
                placeholder="Email/Name"
                sx={{ width: "545px", marginBottom: "20px" }}
              />
            )}
          />
          <Autocomplete
            multiple
            id="tags-outlined"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            onChange={handleChangeSharable}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sharable by"
                placeholder="Email/Name"
                sx={{ width: "545px", marginBottom: "20px" }}
              />
            )}
          />
        </div>
        <Box>
          <TextField
            id="outlined-basic"
            label="(file) Name"
            variant="outlined"
            style={{ width: "545px", marginBottom: "15px" }}
            value={name}
            onChange={handleChangeName}
          />
        </Box>
        <div>
          <FormControl sx={{ marginBottom: "15px" }}>
            <InputLabel id="demo-multiple-name-label">Folder Type</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={pathSelect}
              onChange={handleChangePathType}
              label="Folder"
              sx={{ width: "180px" }}
            >
              <MenuItem key="inFolder" value="inFolder">
                inFolder
              </MenuItem>
              <MenuItem key="folder" value="folder">
                folder
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-textareas"
            label="Path"
            placeholder="path"
            multiline
            value={path}
            onChange={handleChangePath}
            style={{ width: "365px" }}
          />

          <FormControl sx={{ marginBottom: "15px" }}>
            <InputLabel id="demo-multiple-name-label">Sharing</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={sharingTypeSelect}
              onChange={handleChangeSharingType}
              label="Sharing"
              sx={{ width: "180px" }}
            >
              {sharingTypes.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {sharingTypeSelect === "Individual" && (
            <TextField
              id="outlined-textareas"
              label="Individual Name"
              placeholder="username"
              multiline
              value={individual}
              onChange={handleChangeIndividual}
              style={{ width: "365px" }}
            />
          )}
          {sharingTypeSelect === "Domain" && (
            <TextField
              id="outlined-textareas"
              label="Domain Address"
              placeholder="username"
              multiline
              value={domain}
              onChange={handleChangeDomain}
              style={{ width: "365px" }}
            />
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <Button variant="contained" onClick={handleClickGenerate}>
          GENERATE
        </Button>

        <div style={{ width: "10px" }}></div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#E0E0E0",
            color: "black",
            "&:hover": { backgroundColor: "#E0E0E0" },
          }}
          onClick={handleCloseSearchFilter}
        >
          CANCEL
        </Button>
      </div>
    </div>
  );
};

export default QueryBuilder;
