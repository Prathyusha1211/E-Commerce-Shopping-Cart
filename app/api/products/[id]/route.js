

export async function GET(req,{params}) {
    const  id  =parseInt(params.id);
   
    const db=await openDB();

    const product = await db.get("SELECT * FROM Products WHERE id = ?",[id]);

    return new Response(JSON.stringify(product), {
        status: 200,
        statusText: "OK",
    });
   
}