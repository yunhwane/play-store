import type { DBType } from "../../../db/db";
import { router } from "../../trpc";
import { createUserAPI } from "./addUserAPI";
import { deleteUserAPI } from "./deleteUserAPI";
import { getUserAPI } from "./getUserAPI";
import { updateUserAPI } from "./updateUserAPI";

export function allUserAPIRoutes(
  db: DBType,
) {
  return router({
    addUser: createUserAPI(db),
    getUser: getUserAPI(db),
    updateUser: updateUserAPI(db),
    deleteUser: deleteUserAPI(db),
  })
}
