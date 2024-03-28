import { object, string, TypeOf } from "zod";
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }).min(2, "Name should be at least 2 characters"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password should be at least 6 characters"),
    passwordConfirmation: string({
      required_error: "Password Confirmation is required",
    }),
    role: string({
      required_error: "Role is required",
    }),
    token: string({
      required_error: "Token is required",
    }),
  }),
}).refine((data) => data.body.password === data.body.passwordConfirmation, {
  path: ["passwordConfirmation"],
  message: "Passwords do not match",
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password should be at least 6 characters"),
  }),
});
export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
