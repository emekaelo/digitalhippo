import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@/src/trpc/index";

export const trpc = createTRPCReact<AppRouter>({});
