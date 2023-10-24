import axios from "axios";

const URL = "http://localhost:8000";

export const getPost = async () => {
  const res = await axios.get(`${URL}/posts`, { params: { _sort: "title" } });
  console.log(res.data);

  return res.data;
};

export const getPostId = async (id: number) => {
  const res = await axios.get(`${URL}/posts/${id}`);
  console.log(res.data);

  return res.data;
};
