import { db } from "@vercel/postgres";

export async function GET() {
  const cart =
    await db.sql`SELECT CART.id,products.name,products.imageurl,CART.productId,CART.quantity,products.price FROM CART  JOIN Products ON CART.productId = Products.id ORDER BY CART.id`;
  const serailizedData = cart.rows.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageurl,
      productId: product.productid,
      quantity: product.quantity,
    };
  });
  return new Response(JSON.stringify(serailizedData), {
    status: 200,
    statusText: "OK",
  });
}

export async function POST(req) {
  const { productId, quantity } = await req.json();

  const product = await db.sql`SELECT * FROM Products WHERE id = ${productId}`;
  if (product.rows.length === 0) {
    return new Response(JSON.stringify({ message: "Product not found" }), {
      status: 404,
      statusText: "NOT FOUND",
    });
  }

  const prevQunatiy =
    await db.sql`SELECT quantity FROM CART WHERE productId = ${productId}`;

  if (prevQunatiy.rows.length > 0) {
    await db.sql`UPDATE CART SET quantity = ${
      quantity + prevQunatiy.rows[0].quantity
    } WHERE productId = ${productId}`;
    return new Response(JSON.stringify({ message: "Product added to cart" }), {
      status: 200,
      statusText: "OK",
    });
  }

  await db.sql`INSERT INTO CART (productId, quantity) VALUES (${productId}, ${quantity})`;

  return new Response(JSON.stringify({ message: "Product added to cart" }), {
    status: 200,
    statusText: "OK",
  });
}

export async function DELETE(request) {
  const data = await request.json();
  console.log(data);
  const { id } = data;
  await db.sql`DELETE FROM CART WHERE id = ${id}`;
  return new Response(null, {
    status: 200,
    statusText: "OK",
  });
}
export async function PUT(request) {
  const data = await request.json();
  const { id, quantity } = data;
  const prevQunatiy = await db.sql`SELECT quantity FROM CART WHERE id = ${id}`;
  if (prevQunatiy.rows.length === 0) {
    return new Response(JSON.stringify({ message: "Product not found" }), {
      status: 404,
      statusText: "NOT FOUND",
    });
  }
  if (prevQunatiy.rows[0].quantity + quantity <= 0) {
    await db.sql`DELETE FROM CART WHERE id = ${id}`;
    return new Response(null, {
      status: 200,
      statusText: "OK",
    });
  }
  console.log(prevQunatiy.quantity);
  await db.sql`UPDATE CART SET quantity = ${
    prevQunatiy.rows[0].quantity + quantity
  } WHERE id = ${id}`;
  return new Response(null, {
    status: 200,
    statusText: "OK",
  });
}
