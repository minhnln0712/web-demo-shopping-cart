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
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart, removeAllCart } from "../../redux/cartSlice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";

export default function Cart(params: any) {
  const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = () => {
    Axios.get(
      `https://localhost:7040/api/Carts?userid=${getUserId}&pageIndex=1&pageItems=1000`
    )
      .then((response) => {
        setCart(response.data["items"]);
      })
      .catch((error) => console.error(error));
  };

  const dispatch = useAppDispatch();

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

  const getAccessToken: String = useAppSelector(
    (state) => state.user.value.token
  );

  let totalPrice = 0;

  const updateQuantity = (productId: string, quantity: number) => {
    const data: any = {
      userId: getUserId,
      productId: productId,
      quantity: quantity,
    };
    Axios.put(`https://localhost:7040/api/Carts`, data)
      .then((response) => {
        getCartData();
        if (quantity === 0) {
          dispatch(removeAllCart());
          Axios.get(
            `https://localhost:7040/api/Carts?userid=${getUserId}&pageIndex=1&pageItems=1000`,
            {
              headers: {
                Authorization: "Bearer " + getAccessToken,
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => {
              let totalCartOfUser: number = 0;
              const cartList: any[] = response.data.items;
              cartList.filter((item) => {
                dispatch(
                  addToCart({
                    cartId: totalCartOfUser,
                    productId: item["productId"],
                    quantity: item["quantity"],
                  })
                );
                totalCartOfUser++;
                return null;
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => console.error(error));
  };

  const checkOutCart = () => {
    Axios.post(`https://localhost:7040/api/Orders?userid=${getUserId}`, {
      headers: {
        Authorization: "Bearer " + getAccessToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        dispatch(removeAllCart());
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => {
              totalPrice += item.price * item.quantity;
              return (
                <StyledTableRow key={item.cartId}>
                  <StyledTableCell component="th" scope="row">
                    <div className="image-card">
                      <img
                        className="card"
                        src={item.productImage}
                        alt={item.productName}
                      />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <h1>{item.productName}</h1>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <h2>{item.price}&nbsp;VNĐ</h2>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      label="Quantity"
                      type="number"
                      variant="filled"
                      defaultValue={item.quantity}
                      onChange={(event) =>
                        updateQuantity(
                          item.productId,
                          Number(event.target.value)
                        )
                      }
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <h2>{item.price * item.quantity}&nbsp;VNĐ</h2>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      variant="contained"
                      onClick={(event) => updateQuantity(item.productId, 0)}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <h1>Tổng tiền {totalPrice}&nbsp;VNĐ</h1>
        <Button variant="contained" onClick={() => getCartData()}>
          Update Cart Price
        </Button>
        <br />
        <Button variant="outlined" onClick={() => checkOutCart()}>
          Check out
        </Button>
      </div>
    </>
  );
}
