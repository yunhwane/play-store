import z from "zod"
import { procedure } from "../../trpc"
import type { DBType } from "../../../db/db"
import { usersTable } from "../../../db/user.schema"
import { asSuccess } from "../../types/response"

/**
 * 유저 생성 API 
 */
export function createUserAPI(db: DBType) {
  
  return procedure.input(z.object({
    email: z.email(),
    password: z.string().min(8),
  })).mutation(async ({ input }) => {
    
    
    const user = await db
      .insert(usersTable)
      .values({
        email: input.email,
        password: input.password,
      })
      .returning();
      
    return asSuccess(
      {
        id: user[0]?.id!,
        email: user[0]?.email!,
        createdAt: user[0]?.createdAt!,
        updatedAt: user[0]?.updatedAt!,
      }
    )
  })
}