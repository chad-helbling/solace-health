import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  // causes type issues if using a db so comment it out for now
  // if (!process.env.DATABASE_URL) {
  //   console.error("DATABASE_URL is not set");
  //   return {
  //     select: () => ({
  //       from: () => [],
  //     }),
  //   };
  // }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
