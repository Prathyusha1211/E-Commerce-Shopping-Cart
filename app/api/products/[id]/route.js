import { db } from "@vercel/postgres";

export async function GET(req, { params }) {
  const id = parseInt(params.id);

  const product = await db.sql`SELECT * FROM Products WHERE id = ${id}`;

  return new Response(JSON.stringify(product), {
    status: 200,
    statusText: "OK",
  });
}
