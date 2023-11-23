import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email({ message: "please inter a valid email" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters long." }),
});

export type AuthSchemaTypes = z.infer<typeof AuthSchema>;
