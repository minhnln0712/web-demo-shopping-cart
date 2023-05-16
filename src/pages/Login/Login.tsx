import "./Login.css";
import { useState, forwardRef } from "react";
import { login } from "./../../redux/userSlice";
import { useAppDispatch, useAppSelector } from "./../../redux/hooks";
import { authenticateToApp } from "./../../services/services";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import logo from "./../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

export default function Login(params: any) {
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
      // const userData = authenticateToApp(phoneNumber, password);

      dispatch(
        login({
          userId: "2",
          roleId: "1",
          userName: "nhatminh",
          phoneNumber: "071220222222",
          isAuthenticated: true,
          token: "asdasdkasdnbkasndb",
        })
      );
      navigate("/", { replace: true });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" />
        <TextField
          onChange={(e) => setPhoneNumber(e.target.value)}
          label="Phone number"
          type="text"
          error={phoneNumberError.isError}
          helperText={phoneNumberError.textError}
          variant="outlined"
          color="primary"
        />

        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          error={passwordError.isError}
          helperText={passwordError.textError}
          variant="outlined"
        />

        <Button type="submit" variant="contained">
          Login
        </Button>

        <Button variant="outlined">Register</Button>

        <Link href="/">Return to home</Link>
      </form>
    </div>
  );
}
