import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import Button from "@mui/material/Button";

function Row(params: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [listOrderDetail, setListOrderDetail] = useState<any[]>([]);
  const CONFIRM: boolean = true;
  const REJECT: boolean = false;
  const setStatusOrder = (status: boolean) => {
    const data = {
      orderId: params.orderId,
    };
    Axios.post(
      `https://localhost:7040/api/Orders/ConfirmOrder?check=${status}`,
      data
    )
      .then((response) => {
        console.log(response.data);
        getListOrderDetail();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getListOrderDetail = () => {
    Axios.get(`https://localhost:7040/api/Orders/${params.orderId}`)
      .then((response) => {
        setListOrderDetail(response.data.list);
        console.log(listOrderDetail);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              if (!open) {
                getListOrderDetail();
              }
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {params.userName}
        </TableCell>
        <TableCell align="left">{params.address}</TableCell>
        <TableCell align="left">{params.phoneNumber}</TableCell>
        <TableCell align="center">{params.status}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="success"
            onClick={() => setStatusOrder(CONFIRM)}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setStatusOrder(REJECT)}
          >
            Reject
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Detail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price (VNĐ)</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Total price (VNĐ)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listOrderDetail.map((item) => {
                    return (
                      <TableRow key={item.orderDetaiId}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell align="center">{item.price}</TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="center">
                          {item.price * item.quantity}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function OrderList() {
  const [orderList, setOrderList] = useState<any[]>([]);

  useEffect(() => {
    getAllOrderListOfUser();
  }, []);

  const getAllOrderListOfUser = () => {
    Axios.get("https://localhost:7040/api/Orders?pageIndex=1&pageItems=10")
      .then((response) => {
        setOrderList(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Button</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((item) => {
            let status: any = null;
            switch (item.status) {
              case true:
                status = "Confirmed";
                break;
              case false:
                status = "Rejected";
                break;
              default:
                status = "Waiting";
                break;
            }
            return (
              <Row
                key={item.orderid}
                userName={item.username}
                phoneNumber={item.phonenumber}
                address={item.address === null ? "K có address" : item.address}
                status={status}
                orderId={item.orderid}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
