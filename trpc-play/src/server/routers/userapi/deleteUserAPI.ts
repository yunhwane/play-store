import { eq } from "drizzle-orm";
import type { DBType } from "../../../db/db";
import { usersTable } from "../../../db/user.schema";
import { procedure } from "../../trpc";
import { asSuccess } from "../../types/response";
import { checkAuth } from "../../utils/jwt";


export function deleteUserAPI(db: DBType) {

  return procedure.mutation(async ({ ctx }) => {
    const payload = checkAuth(ctx.token);
    
    if (payload.status === "error") {
      return payload;
    }
    
    const userId = payload.data.userId;
    await db.delete(usersTable).where(eq(usersTable.id, userId));
    return asSuccess("OK");
  })
}