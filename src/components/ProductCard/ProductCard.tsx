import "./ProductCard.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart, updateACart } from "./../../redux/cartSlice";

export default function ProductCard(params: any) {
  const dispatch = useAppDispatch();
  const getLatestCartId: number = useAppSelector((state) =>
    state.cart.listCart.length === 0
      ? 1
      : state.cart.listCart[state.cart.listCart.length - 1].cartId + 1
  );
  const cartList: any[] = useAppSelector((state) => state.cart.listCart);

  const addProductToCart = (productId: string) => {
    let isNotExist: boolean = true;
    cartList.filter((cart) => {
      if (cart.productId === productId) {
        isNotExist = false;
        dispatch(
          updateACart({
            cartId: cart.cardId,
            productId: productId,
            quantity: cart.quantity + 1,
          })
        );
      }
      return null;
    });
    if (isNotExist) {
      dispatch(
        addToCart({
          cartId: getLatestCartId,
          productId: productId,
          quantity: 1,
        })
      );
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
        <div className="image-card">
          <img className="card" src={params.img} alt={params.productName} />
        </div>
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
