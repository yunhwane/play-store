import { createTRPCClient, httpLink } from "@trpc/client";
import type { AppRouter } from "./__allRoutes";

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

async function qweqweqwe() {
  const qweqwe = await trpc.user.addUser.mutate({
    email: "test@test.com",
    password: "password",
  });

  console.log(qweqwe);
}
qweqweqwe();