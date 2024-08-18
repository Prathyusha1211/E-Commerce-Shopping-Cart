import { openDB } from "../products/route";



export async function GET(){
    const db = await openDB();

    const cart = await db.all("SELECT CART.id,products.name,products.imageUrl,CART.productId,CART.quantity,products.price FROM CART  JOIN Products ON CART.productId = Products.id");

    return new Response(JSON.stringify(cart), {
        status: 200,
        statusText: "OK",
    });
}

export async function POST(req){
    const {productId,quantity} = await req.json();
    const db = await openDB();

    const product = await db.get("SELECT * FROM Products WHERE id = ?",[productId]);
    if(!product){
        return new Response(JSON.stringify({message:"Product not found"}), {
            status: 404,
            statusText: "NOT FOUND",
        });
    }

    const prevQunatiy = await db.get("SELECT quantity FROM CART WHERE productId = ?",[productId]);
    if(prevQunatiy){
        await db.run("UPDATE CART SET quantity=? WHERE productId=?",[prevQunatiy.quantity+quantity,productId]);
        return new Response(JSON.stringify({message:"Product added to cart"}), {
            status: 200,
            statusText: "OK",
        });
    }
    
    await db.run("INSERT INTO CART (productId,quantity) VALUES (?,?)",[productId,quantity]);


    return new Response(JSON.stringify({message:"Product added to cart"}), {
        status: 200,
        statusText: "OK",
    });
}

    export async function DELETE(request) {
        const db = await openDB();
        const data = await request.json();
        console.log(data);
        const { id } = data;
        await db.run("DELETE FROM CART WHERE id=?", [id]);
        return new Response(null, {
        status: 200,
        statusText: "OK",
        });
    }
  export async function PUT(request) {
    const db = await openDB();
    const data = await request.json();
    const { id, quantity } = data;
    const prevQunatiy = await db.get("SELECT quantity FROM CART WHERE id = ?", [id]);
    if (!prevQunatiy) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        statusText: "NOT FOUND",
      });
    }
    if(prevQunatiy.quantity+quantity<=0){
      await db.run("DELETE FROM CART WHERE id=?", [id]);
      return new Response(null, {
        status: 200,
        statusText: "OK",
      });
    }
    console.log(prevQunatiy.quantity);
    await db.run("UPDATE CART SET quantity=? WHERE id=?", [quantity+prevQunatiy.quantity, id]);
    return new Response(null, {
      status: 200,
      statusText: "OK",
    });
  }