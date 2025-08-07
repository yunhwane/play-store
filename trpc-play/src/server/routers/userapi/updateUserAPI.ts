import z from "zod";
import type { DBType } from "../../../db/db";
import { procedure } from "../../trpc";
import { usersTable } from "../../../db/user.schema";
import { eq } from "drizzle-orm";
import { asSuccess } from "../../types/response";
import { checkAuth } from "../../utils/jwt";



/**
 * 유저 이메일 업데이트 
 */
export function updateUserAPI(db: DBType) { 
  return procedure.input(z.object({
    email: z.email()
  })).mutation(async ({ input, ctx }) => {

    const payload = checkAuth(ctx.token);
    
    if (payload.status === "error") {
      return payload;
    }
    const userId = payload.data.userId;
    const user = await db.update(usersTable).set({
      email: input.email
    }).where(eq(usersTable.id, userId)).returning();

    return asSuccess(
      {
        id: user[0]?.id,
        email: user[0]?.email,
        createdAt: user[0]?.createdAt,
        updatedAt: user[0]?.updatedAt,
      }
    )
  })
}
