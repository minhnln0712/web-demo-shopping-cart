import axios from "axios";

export async function authenticateToApp(phoneNumber: string, password: string) {
  try {
    // const res = await axios.get("cai j do");
    const userData = {
      userId: "2",
      roleId: "1",
      userName: "nhatminh",
      phoneNumber: "071220222222",
      isAuthenticated: true,
      token: "asdasdkasdnbkasndb",
    };
    console.log(userData);
    return userData;
  } catch (error) {
    return error;
  }
}
