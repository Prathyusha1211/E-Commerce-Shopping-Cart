// import sqlite3 from "sqlite3";
// import { open } from "sqlite";
import products from "../../_data/products.json";

// export async function openDB() {
//   return open({
//     filename: "./mydatabase.db",
//     driver: sqlite3.Database,
//   });
// }
// async function createTable() {
//   const db = await openDB();
//   db.all(
//     "CREATE TABLE IF NOT EXISTS Products (id INTEGER  PRIMARY KEY AUTOINCREMENT, name TEXT, price INTEGER, imageUrl TEXT, description TEXT)"
//   );
//   db.all(
//     "CREATE TABLE IF NOT EXISTS CART (id INTEGER PRIMARY KEY AUTOINCREMENT, productId INTEGER, quantity INTEGER, FOREIGN KEY(productId) REFERENCES Products(id))"
//   );
// }
// export async function GET() {
//   const db = await openDB();
//   await createTable();
//   const products = await db.all("SELECT * FROM Products");
//   return new Response(JSON.stringify(products), {
//     status: 200,
//     statusText: "OK",
//   });

// }

// export async function POST(req) {
// //   const { name, price, imageUrl, description } = await req.json();
//   const db = await openDB();
//   await createTable();
//     products.forEach(async (product) => {
//     await db.run(
//       "INSERT INTO Products (name, price, imageUrl, description) VALUES (?, ?, ?, ?)",
//       [product.name, product.price, product.image_url, product.description]
//     );
//     }
//     );

//   return new Response(JSON.stringify({ message: "Product added" }), {
//     status: 200,
//     statusText: "OK",
//   });
// }
import { db } from "@vercel/postgres";

async function createTable() {
  db.sql`CREATE TABLE IF NOT EXISTS Products (id  BIGSERIAL PRIMARY KEY  , name TEXT, price DOUBLE PRECISION, imageUrl TEXT, description TEXT)`;
  db.sql`CREATE TABLE IF NOT EXISTS CART (id  BIGSERIAL PRIMARY KEY  , productId INTEGER, quantity INTEGER, FOREIGN KEY(productId) REFERENCES Products(id))`;
}
export async function GET() {
  await createTable();

  const products = await db.sql`SELECT * FROM Products`;
  const serailizedData = products.rows.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageurl,
      description: product.description,
    };
  });
  return new Response(JSON.stringify(serailizedData), {
    status: 200,
    statusText: "OK",
  });
}
export async function POST(request) {
  const data = await request.json();
  const { name, price, imageUrl, description } = data;

  products.forEach(async (product) => {
    await db.sql`INSERT INTO Products (name, price, imageurl, description) VALUES (${product.name}, ${product.price}, ${product.image_url}, ${product.description})`;
  });

  return new Response(products, {
    status: 201,
    statusText: "Created",
  });
}
