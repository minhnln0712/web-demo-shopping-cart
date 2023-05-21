import "./Login.css";
import { useState, forwardRef } from "react";
import { login } from "./../../redux/userSlice";
import { addToCart } from "./../../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "./../../redux/hooks";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import logo from "./../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import jwt_decode from "jwt-decode";

export default function Login(params: any) {
  interface MyToken {
    Userid: string;
    UserName: string;
    RoleId: string;
    PhoneNumber: string;
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<any>({
    isError: false,
    textError: "",
  });
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<any>({
    isError: false,
    textError: "",
  });

  const getAccessToken: String = useAppSelector(
    (state) => state.user.value.token
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPhoneNumberError({
      isError: false,
      textError: "",
    });
    setPasswordError({
      isError: false,
      textError: "",
    });
    if (phoneNumber.trim() === "") {
      setPhoneNumberError({
        isError: true,
        textError: "Please enter your phone number.",
      });
    }
    if (password.trim() === "") {
      setPasswordError({
        isError: true,
        textError: "Please enter your password.",
      });
    }
    if (phoneNumber && password) {
      const data = {
        phoneNumber: phoneNumber,
        password: password,
      };
      Axios.post("https://localhost:7040/api/v1/User/login", data)
        .then((response) => {
          dispatch(
            login({
              userId: jwt_decode<MyToken>(response.data).Userid,
              roleId: jwt_decode<MyToken>(response.data).RoleId,
              userName: jwt_decode<MyToken>(response.data).UserName,
              phoneNumber: jwt_decode<MyToken>(response.data).PhoneNumber,
              isAuthenticated: true,
              token: response.data,
            })
          );
          Axios.get(
            `https://localhost:7040/api/Carts?userid=${
              jwt_decode<MyToken>(response.data).Userid
            }&pageIndex=1&pageItems=1000`,
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
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" />
        <TextField
          sx={{ mt: "10px" }}
          onChange={(e) => setPhoneNumber(e.target.value)}
          label="Phone number"
          type="text"
          error={phoneNumberError.isError}
          helperText={phoneNumberError.textError}
          variant="outlined"
          color="primary"
        />

        <TextField
          sx={{ mt: "10px" }}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          error={passwordError.isError}
          helperText={passwordError.textError}
          variant="outlined"
        />

        <Button sx={{ mt: "10px" }} type="submit" variant="contained">
          Login
        </Button>

        <Button sx={{ mt: "10px", mb: "10px" }} variant="outlined">
          Register
        </Button>

        <Link href="/">Return to home</Link>
      </form>
    </div>
  );
}
