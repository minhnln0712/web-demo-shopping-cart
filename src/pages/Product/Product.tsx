import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Grid from "@mui/material/Grid";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { addToCart, updateACart } from "../../redux/cartSlice";

export default function Product(params: any) {
  let { productId } = useParams();

  useEffect(() => {
    Axios.get(`https://localhost:7040/api/Products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const dispatch = useAppDispatch();

  const getLatestCartId: number = useAppSelector((state) =>
    state.cart.listCart.length === 0
      ? 1
      : state.cart.listCart[state.cart.listCart.length - 1].cartId + 1
  );

  const [product, setProduct] = useState<any>({
    productId: "",
    productName: "",
    productDetail: "",
    price: 0,
    productTypeName: "",
    img: "",
  });

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
    <>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={8}>
          <img className="card" src={product.img} alt={product.productName} />
        </Grid>
        <Grid item xs={4}>
          <p>{product.productName}</p>
          <p>{product.price}</p>
          <p>{product.productDetail}</p>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => addProductToCart(product.productId)}
          >
            <AddShoppingCartIcon /> Add to cart
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
