import type { DBType } from "../../../db/db";
import { usersTable } from "../../../db/user.schema";
import { eq } from 'drizzle-orm';
import {asSuccess } from "../../types/response";
import { procedure } from "../../trpc";
import { checkAuth } from "../../utils/jwt";


/**
 * 유저 정보 조회 API 
 */
export function getUserAPI(db: DBType) {
  return procedure.query(async ({ ctx }) => {

    const payload = checkAuth(ctx.token);
    
    if (payload.status === "error") {
      return payload;
    }

    const userId = payload.data.userId;
    
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));

    return asSuccess(
      {
        id: user?.id,
        email: user?.email,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt,
      } as const
    )
  });
}