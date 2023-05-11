import { useSelector } from "react-redux";

export default function User(params: any) {
  const authenticatedPhoneNumber = useSelector(
    (state: any) => state.user.value.phoneNumber
  );

  return (
    <>
      <h1>This is a user page of {authenticatedPhoneNumber}</h1>
    </>
  );
}
