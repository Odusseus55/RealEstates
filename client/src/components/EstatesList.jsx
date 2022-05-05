import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useStyle } from "../styles";
import axios from "axios";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const getRealEstates = async () => {
  const url = "http://127.0.0.1:8000/lead";
  try {
    const response = await axios.get(url);
    return response;
  } catch (e) {
    console.error(e);
  }
};

function EstateList() {
  const [estates, setEstates] = React.useState([]);
  const classes = useStyle();

  React.useEffect(() => {
    loadEstates();
  }, []);

  const loadEstates = async () => {
    const response = await getRealEstates();
    if (!response) {
      setEstates([]);
    } else {
      setEstates(response.data.reverse());
    }
  };

  const deleteEstate = async (id) => {
    const url = `http://127.0.0.1:8000/lead/${id}`;
    try {
      await axios.delete(url);
      loadEstates();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box my={3} className={classes.estateList}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Typ nemovitosti</TableCell>
              <TableCell>Kraj</TableCell>
              <TableCell>Okres</TableCell>
              <TableCell>Jméno</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estates.map((estate) => (
              <TableRow
                key={estate._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {estate.estateType}
                </TableCell>
                <TableCell>{estate.region}</TableCell>
                <TableCell>{estate.district}</TableCell>
                <TableCell>{estate.fullName}</TableCell>
                <TableCell>{estate.phone}</TableCell>
                <TableCell>{estate.email}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => deleteEstate(estate._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default EstateList;
