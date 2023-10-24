import { useQuery } from "@tanstack/react-query";
import { getPost } from "./api/post";

const PostList1 = () => {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPost,
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>;
  }
  return (
    <>
      <h1>Post List 1</h1>
      <ol>
        {postQuery.data?.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </>
  );
};

export default PostList1;
