import "./ProductCard.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart, updateACart } from "./../../redux/cartSlice";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function ProductCard(params: any) {
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
    if (getAccessToken === null) {
      alert("You need to login before adding product!");
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
        <Link
          to={`/product/${params.productId}`}
          style={{ textDecoration: "none", color: "#212A3E" }}
        >
          <div className="image-card">
            <img className="card" src={params.img} alt={params.productName} />
          </div>
        </Link>

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
