import { db } from "../../db/db";
import { router } from "../trpc";
import { allUserAPIRoutes } from "./userapi/__allUserRoutes";

export const allRoutes = router({
  user: allUserAPIRoutes(db),
})

export type AppRouter = typeof allRoutes;

