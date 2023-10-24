import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const POST = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
];

const App = () => {
  console.log(POST);

  const queryClient = useQueryClient();
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POST]),
  });

  const newPostMutation = useMutation({
    mutationFn: (title: string) => {
      return wait(1000).then(() => POST.push({ id: Math.random(), title }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>;
  }
  return (
    <>
      <h1>Tanstack React Quedsryd</h1>
      <div>
        {postQuery.data?.map((post) => (
          <p key={post.id}>{post.title}</p>
        ))}
      </div>
      <button
        disabled={newPostMutation.isPending}
        onClick={() => newPostMutation.mutate("new post")}
      >
        add new
      </button>
    </>
  );
};
const wait = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};
export default App;
