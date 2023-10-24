import { useQuery } from "@tanstack/react-query";
import { getPostId } from "./api/post";
const Post = ({ id }: any) => {
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostId(id),
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>;
  }
  return (
    <>
      <h1>{postQuery.data.title}</h1>
      <small>{postQuery.data.userId}</small>
    </>
  );
};

export default Post;
