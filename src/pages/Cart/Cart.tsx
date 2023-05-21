import Axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export default function Cart(params: any) {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    Axios.get(
      `https://localhost:7040/api/Carts?userid=${getUserId}&pageIndex=1&pageItems=1000`
    )
      .then((response) => {
        console.log(response.data["items"]);
        setCart(response.data["items"]);
      })
      .catch((error) => console.error(error));
  }, []);

  const getUserId: String = useAppSelector((state) => state.user.value.userId);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  let totalPrice = 0;

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, maxWidth: 1400, m: "auto" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Thông tin chi tiết sản phẩm</StyledTableCell>
              <StyledTableCell align="right">Đơn giá</StyledTableCell>
              <StyledTableCell align="right">Số lượng</StyledTableCell>
              <StyledTableCell align="right">Tổng giá</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => {
              totalPrice += item.price * item.quantity;
              return (
                <StyledTableRow key={item.cartId}>
                  <StyledTableCell component="th" scope="row">
                    <Link
                      to={`/product/${params.productId}`}
                      style={{ textDecoration: "none", color: "#212A3E" }}
                    >
                      <div className="image-card">
                        <img
                          className="card"
                          src={item.productImage}
                          alt={item.productName}
                        />
                      </div>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Link
                      to={`/product/${item.productId}`}
                      style={{
                        textDecoration: "none",
                        color: "#212A3E",
                        fontSize: "30px",
                      }}
                    >
                      {item.productName}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <h2>{item.price}&nbsp;VNĐ</h2>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <h2>{item.price * item.quantity}&nbsp;VNĐ</h2>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <h1>Tổng tiền {totalPrice}&nbsp;VNĐ</h1>
        Nut update xuong db Nut update xuong db + check out
      </div>
    </>
  );
}
