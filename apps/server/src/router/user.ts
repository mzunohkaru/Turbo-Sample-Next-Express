// import { Hono } from "hono";

// import prisma from "@repo/database";
// import { UserResponse } from "@repo/schema";

// const app = new Hono().get(async (c) => {
//   const users: UserResponse[] = await prisma.user.findMany();
//   return c.json(users);
// });

// app.post(async (c) => {
//   const body = await c.req.json();
//   const user: UserResponse = await prisma.user.create({
//     data: body,
//   });
//   return c.json(user);
// });

// export default app;
// export type AppType = typeof app;
