import { trpc } from "../lib/trpc";
import { useState } from "react";
// import { generateJWT } from "server/src/lib/jwt";

export default function SignUp() {
  const { data } = trpc.user.getAll.useQuery();
  const [name, setName] = useState("Ahmed");
  const [email, setEmail] = useState("Email");
  const [password, setPassword] = useState("test");
  const SignUpMutation = trpc.user.create.useMutation();
  const trpContext = trpc.useContext();
  return (
    <div className="flex justify-between space-x-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
        className="flex-grow rounded-md"
      />
      <button
        className="bg-green-500 hover:bg-green-600 active:bg-green-500 text-white py-1 px-3 rounded-md"
        onClick={() => {
          const token = "dfadf";
          SignUpMutation.mutate(
            { name, email, password, role: "USER", token },
            {
              onSuccess: () => {
                setName("");
                trpContext.user.invalidate();
              },
            }
          );
        }}
      >
        Sign up
      </button>
    </div>
  );
}
