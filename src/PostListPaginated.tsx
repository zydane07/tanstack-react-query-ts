import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPostsPaginated } from "./api/post";

const PostListPaginated = () => {
  const [page, setPage] = useState<number>(1);

  const { status, error, data, isPlaceholderData } = useQuery({
    queryKey: ["posts", { page }],
    placeholderData: keepPreviousData,
    queryFn: () => getPostsPaginated(page),
  });

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "error") return <h1> {JSON.stringify(error)} </h1>;

  return (
    <>
      <h1>
        Post List Paginated
        <br />
        <small> {isPlaceholderData && "Previous Data"} </small>
      </h1>
      {data.posts.map((post: any) => (
        <div key={post.id}> {post.title} </div>
      ))}

      {data.previousPage && (
        <button
          onClick={() => {
            if (data.previousPage !== undefined) {
              setPage(data.previousPage);
            }
          }}
        >
          Previous
        </button>
      )}
      {data.nextPage && (
        <button
          onClick={() => {
            if (data.nextPage !== undefined) {
              setPage(data.nextPage);
            }
          }}
        >
          Next
        </button>
      )}
    </>
  );
};

export default PostListPaginated;
