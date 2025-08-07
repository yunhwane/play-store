import { initTRPC } from "@trpc/server";
import { type AuthTokenType } from "./utils/jwt";
import { type CreateExpressContextOptions } from '@trpc/server/adapters/express'



export async function createContext(opts: CreateExpressContextOptions) {
  const token = opts.req.headers.get('authorization') as AuthTokenType ?? null;
  return { token };
}
type ContextType = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<ContextType>().create();

export const router = t.router;
export const procedure = t.procedure;