import axios from "axios";

const URL = "http://localhost:8000";

interface Post {
  id: number;
  title: string;
  body: string;
}

export const getPost = async (): Promise<Post[]> => {
  const res = await axios.get(`${URL}/posts`, { params: { _sort: "title" } });
  console.log("posts: ", res.data);

  return res.data;
};

export const getPostId = async (id: number) => {
  const res = await axios.get(`${URL}/posts/${id}`);
  console.log("posts id: ", res.data);

  return res.data;
};

export const getPostsPaginated = async (page: any) => {
  const res = await axios.get(`${URL}/posts`, {
    params: { _page: page, _sort: "title", _limit: 2 },
  });
  const hasNext = page * 2 <= parseInt(res.headers["x-total-count"]);
  return {
    nextPage: hasNext ? page + 1 : undefined,
    previousPage: page > 1 ? page - 1 : undefined,
    posts: res.data,
  };
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const res = await axios.post(`${URL}/posts`, {
    title: post.title,
    body: post.body,
    userId: 1,
  });
  return res.data;
};
