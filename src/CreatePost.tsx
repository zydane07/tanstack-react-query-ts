import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { createPost } from "./api/post";
import Post from "./Post";

const CreatePost = ({ setCurrentPage }: any) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.setQueryData(["posts", data.id], data);
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: true });
      setCurrentPage(<Post id={data.id} />);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createPostMutation.mutate({
      title: titleRef.current!.value,
      body: bodyRef.current!.value,
    });
  };

  return (
    <>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input type="text" id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">body</label>
          <input type="text" id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isPending}>
          {createPostMutation.isPending ? "loading..." : "Create"}
        </button>
      </form>
    </>
  );
};

export default CreatePost;
