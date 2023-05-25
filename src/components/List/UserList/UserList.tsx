import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Axios from "axios";
import { useEffect, useState } from "react";

export default function UserList() {
  const [userList, setUserList] = useState<any[]>([]);
  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    Axios.get(`https://localhost:7040/api/v1/User?pageIndex=1&pageItems=100`)
      .then((res) => {
        setUserList(res.data.items);
      })
      .catch((error: any) => console.error(error));
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">userId</TableCell>
            <TableCell align="left">userName</TableCell>
            <TableCell align="left">phoneNumber</TableCell>
            <TableCell align="left">address</TableCell>
            <TableCell align="left">roleName</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((item) => (
            <TableRow key={item.userId}>
              <TableCell align="left">{item.userId}</TableCell>
              <TableCell align="left">{item.userName}</TableCell>
              <TableCell align="left">{item.phoneNumber}</TableCell>
              <TableCell align="left">{item.address}</TableCell>
              <TableCell align="left">{item.roleName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
