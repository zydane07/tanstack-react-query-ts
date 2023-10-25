import { useQuery } from "@tanstack/react-query";
import { getPostId } from "./api/post";
import { getUserId } from "./api/user";
const Post = ({ id }: any) => {
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostId(id),
  });

  const userQuery = useQuery({
    queryKey: ["users", postQuery?.data?.userId],
    enabled: postQuery?.data?.userId != null,
    queryFn: () => getUserId(postQuery.data.userId),
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>;
  }
  return (
    <>
      <h1>{postQuery.data.title}</h1>
      <small>
        {postQuery.data.userId}.{" "}
        {userQuery.isLoading
          ? "Loading User..."
          : userQuery.isError
          ? "error loading user"
          : userQuery.data.name}
      </small>
      <p>{postQuery.data.body}</p>
    </>
  );
};

export default Post;
