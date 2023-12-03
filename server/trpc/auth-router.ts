import { AuthSchema } from "../../lib/schema";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const authRouter = router({
  // sign up route
  createPayloadUser: publicProcedure
    .input(AuthSchema)
    .mutation(async ({ input: { email, password } }) => {
      const payload = await getPayloadClient();

      // check if user already exists
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });

      await payload.create({
        collection: "users",
        data: { email, password, role: "user" },
      });
      return { success: true, sentToEmail: email };
    }),

  // verify user route
  verifyEmail: publicProcedure
    .input(
      z.object({
        token: z.string(),
      }),
    )
    .query(async ({ input: { token } }) => {
      const payload = await getPayloadClient();
      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });
      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { success: true };
    }),

  // user login route
  signinUser: publicProcedure
    .input(AuthSchema)
    .mutation(async ({ input: { email, password }, ctx }) => {
      const { res } = ctx;
      const payload = await getPayloadClient();

      try {
        await payload.login({
          collection: "users",
          data: { email, password },
          res,
        });
        return { success: true };
      } catch (error) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
