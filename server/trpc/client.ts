import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "./index";

export const trpc = createTRPCReact<AppRouter>({});
