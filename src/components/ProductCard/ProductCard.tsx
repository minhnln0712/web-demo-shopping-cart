import "./ProductCard.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart, updateACart } from "./../../redux/cartSlice";
import Axios from "axios";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import Product from "../../pages/Product/Product";

export default function ProductCard(params: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const dispatch = useAppDispatch();
  const getLatestCartId: number = useAppSelector((state) =>
    state.cart.listCart.length === 0
      ? 1
      : state.cart.listCart[state.cart.listCart.length - 1].cartId + 1
  );
  const cartList: any[] = useAppSelector((state) => state.cart.listCart);
  const getAccessToken: String = useAppSelector(
    (state) => state.user.value.token
  );
  const getUserId: String = useAppSelector((state) => state.user.value.userId);
  const addProductToCart = (productId: string) => {
    if (getAccessToken.length <= 0) {
      alert("You need to login before adding product!");
      return;
    }
    let isNotExist: boolean = true;
    cartList.filter((cart) => {
      if (cart.productId === productId) {
        isNotExist = false;
        const data = {
          userid: getUserId,
          productid: productId,
          quantity: cart.quantity + 1,
        };
        Axios.put("https://localhost:7040/api/Carts", data, {
          headers: {
            Authorization: "Bearer " + getAccessToken,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            dispatch(
              updateACart({
                cartId: cart.cardId,
                productId: productId,
                quantity: cart.quantity + 1,
              })
            );
          })
          .catch((error) => {
            console.error(error);
          });
      }
      return null;
    });
    if (isNotExist) {
      const data = {
        userid: getUserId,
        productid: productId,
        quantity: 1,
      };
      Axios.post("https://localhost:7040/api/Carts", data, {
        headers: {
          Authorization: "Bearer " + getAccessToken,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          dispatch(
            addToCart({
              cartId: getLatestCartId,
              productId: productId,
              quantity: 1,
            })
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
    isNotExist = true;
  };

  return (
    <div className="card">
      <Box
        sx={{
          width: 325,
          height: 500,
          backgroundColor: "#9BA4B5",
          "&:hover": {
            backgroundColor: "#F1F6F9",
            opacity: [0.9],
          },
        }}
      >
        {/* <Link
          to={`/product/${params.productId}`}
          style={{ textDecoration: "none", color: "#212A3E" }}
        >
          <div className="image-card">
            <img className="card" src={params.img} alt={params.productName} />
          </div>
        </Link> */}

        <div className="image-card">
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            sx={{ width: 325, height: 325 }}
          >
            <img className="card" src={params.img} alt={params.productName} />
          </Button>
        </div>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          PaperProps={{
            sx: {
              borderRadius: "20px",
            },
          }}
        >
          <Product productId={params.productId} />
        </Popover>

        <p>{params.productName}</p>
        <p>{params.price}</p>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => addProductToCart(params.productId)}
        >
          <AddShoppingCartIcon /> Add to cart
        </Button>
      </Box>
    </div>
  );
}
