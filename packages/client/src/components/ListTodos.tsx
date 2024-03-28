import { trpc } from "../lib/trpc";
export default function ListTodos() {
  const { data, isError, isLoading, error } = trpc.todo.list.useQuery();
  isError && <h2>{error.message}</h2>;
  isLoading && <h2>Loading...</h2>;

  const trpcContext = trpc.useContext();

  const deleteMutation = trpc.todo.delete.useMutation();
  const updateMutation = trpc.todo.update.useMutation();
  function handleDelete(id) {
    deleteMutation.mutate(
      { id },
      {
        onSuccess: () => {
          trpcContext.todo.list.invalidate();
        },
      }
    );
  }
  function updateTodo(todo) {
    updateMutation.mutate(
      { id: todo.id, isCompleted: !todo.isCompleted },

      {
        onSuccess: () => {
          trpcContext.todo.list.invalidate();
        },
      }
    );
  }

  return (
    <ul className="">
      {data?.map((todo) => {
        return (
          <li
            className="flex justify-between items-center bg-gray-100 py-2 px-3 rounded-md space-x-2"
            key={todo.id}
          >
            <p>{todo.title}</p>
            <button
              className="text-white bg-green-600 px-2 py-1 rounded text-sm hover:line-through cursor-pointer hover:text-black"
              onClick={() => updateTodo(todo)}
            >
              {todo.isCompleted ? "Complete" : "Incomplete"}
            </button>

            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-white hover:bg-red-500 p-1 rounded"
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
