import axios from "axios";

const URL = "http://localhost:8000";

export const getUserId = async (id: number) => {
  const res = await axios.get(`${URL}/users/${id}`);
  console.log("user:", res.data);

  return res.data;
};
