import db from "../../../db";
import { advocates } from "../../../db/schema";
import { sql } from "drizzle-orm";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search");

    const searchQuery = `${search}:*`;

    if (search) {
      const data = await db
        .select()
        .from(advocates)
        .where(
          sql`to_tsvector('english', ${advocates.firstName} || ' ' || ${advocates.lastName} || ' ' || ${advocates.city} || ' ' || ${advocates.degree} || ' ' || coalesce(${advocates.specialties}::text, '')) @@ to_tsquery('english', ${searchQuery})`,
        )
        .orderBy(
          sql`ts_rank(
              to_tsvector('english', ${advocates.firstName} || ' ' || ${advocates.lastName} || ' ' || ${advocates.city} || ' ' || ${advocates.degree} || ' ' || coalesce(${advocates.specialties}::text, '')),
              to_tsquery('english', ${searchQuery})
              ) DESC`,
        );

      return Response.json({ data });
    }

    const data = await db.select().from(advocates);

    return Response.json({ data });
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}
