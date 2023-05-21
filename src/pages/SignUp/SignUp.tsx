import { useState, forwardRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "./../../redux/hooks";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { error } from "console";

export default function SignUp(params: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<any>({
    isError: false,
    textError: "",
  });
  const [userName, setUserName] = useState<string>("");
  const [userNameError, setUserNameError] = useState<any>({
    isError: false,
    textError: "",
  });
  const [address, setAddress] = useState<string>("");
  const [addressError, setAddressError] = useState<any>({
    isError: false,
    textError: "",
  });
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<any>({
    isError: false,
    textError: "",
  });
  const [cfpassword, setCFPassword] = useState<string>("");
  const [cfpasswordError, setCFPasswordError] = useState<any>({
    isError: false,
    textError: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPhoneNumberError({
      isError: false,
      textError: "",
    });
    setUserNameError({
      isError: false,
      textError: "",
    });
    setAddressError({
      isError: false,
      textError: "",
    });
    setPasswordError({
      isError: false,
      textError: "",
    });
    setCFPasswordError({
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
      setUserNameError({
        isError: true,
        textError: "Please enter your username.",
      });
    }
    if (password.trim() === "") {
      setAddressError({
        isError: true,
        textError: "Please enter your address.",
      });
    }
    if (password.trim() === "") {
      setPasswordError({
        isError: true,
        textError: "Please enter your password.",
      });
    }
    if (password.trim() === "") {
      setCFPasswordError({
        isError: true,
        textError: "Please confirm your password.",
      });
    }
    if (password.trim() !== cfpassword.trim()) {
      setCFPasswordError({
        isError: true,
        textError: "Please confirm the correct password.",
      });
    }
    if (phoneNumber && password && userName && address && cfpassword) {
      const data = {
        phoneNumber: phoneNumber,
        userName: userName,
        address: address,
        password: password,
      };
      Axios.post("https://localhost:7040/api/v1/User", data)
        .then((response) => {
          if (response.data.userId !== null) {
            navigate("/", { replace: true });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Đăng ký</h1>
        <p>Nhanh chóng và dễ dàng.</p>
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
          onChange={(e) => setUserName(e.target.value)}
          label="UserName"
          type="text"
          error={userNameError.isError}
          helperText={userNameError.textError}
          variant="outlined"
          color="primary"
        />
        <TextField
          sx={{ mt: "10px" }}
          onChange={(e) => setAddress(e.target.value)}
          label="Address"
          type="text"
          error={addressError.isError}
          helperText={addressError.textError}
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
        <TextField
          sx={{ mt: "10px" }}
          onChange={(e) => setCFPassword(e.target.value)}
          label="Confirm Password"
          type="password"
          error={cfpasswordError.isError}
          helperText={cfpasswordError.textError}
          variant="outlined"
        />
        <Button sx={{ mt: "10px" }} type="submit" variant="contained">
          Sign up
        </Button>
      </form>
    </>
  );
}
