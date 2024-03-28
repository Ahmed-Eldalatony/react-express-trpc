import { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import ListTodos from "./components/ListTodos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./lib/trpc";
import SignUp from "./components/User";
import { httpBatchLink } from "@trpc/client";
function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
        }),
      ],
    });
  });
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-xl mx-auto">
          <div className="text-center text-3xl font-bold text-gray-700">
            <h1>Vite + React | Express | tRPC</h1>
            <h3>npm workspaces</h3>
            <SignUp />
          </div>
          <div className="max-w-md mx-auto grid gap-y-4 mt-8">
            <AddTodo />
            <ListTodos />
            {/* <GetTodoById /> */}
          </div>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
