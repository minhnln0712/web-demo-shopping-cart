import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Login.css";
import { useState } from "react";
import { login, logout } from "./../../redux/userSlice";
import { useDispatch } from "react-redux";

export default function Login(params: any) {
  // const [phoneNumber, setPhoneNumber] = useState<string>("");

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    phoneNumber: yup.string().required("Your phone number is required!"),
    password: yup.string().required("Your password is required!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    // setPhoneNumber(data.phoneNumber);
    // dispatch(login({ phoneNumber: data.phoneNumber }));
  };

  return (
    <div>
      <h1>This is a Login page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Phone Number"
          {...register("phoneNumber")}
        />
        {/* <p>{errors.phoneNumber?.message}</p> */}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {/* <p>{errors.password?.message}</p> */}
        <input type="submit" value="Login" />
      </form>

      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
}
