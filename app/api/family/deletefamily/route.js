const { MongoClient, ServerApiVersion } = require("mongodb");
import { NextResponse } from 'next/server'
 
export async function DELETE(req) {
  const uri = "mongodb+srv://abdulmohizdesigns:mTG87LJR87HlUDvq@abdulmohizdesigns.enjz22u.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    // Getting search param from url
    const {searchParams} = new URL(req.url);
    const Fcode = searchParams.get("id");

    // Handling database connection
    await client.connect();
    const db = client.db('fee_management')
    const collection = db.collection('families')

    // Check exists or not to which we have to delete. If exists then return message
    const chechEitherFamilyExists = await collection.findOne({Fcode})
    if(!chechEitherFamilyExists){
        return NextResponse.json({message: "No Family with this id"}, {status: 405}) 
    }

    // Deleting the student
    const deleteStudent = await collection.deleteOne({Fcode})
    return NextResponse.json({message: "Family has successfully deleted",data: deleteStudent}, {status: 200})
  } catch(error){
    const Error = "Inter Server Error"
    return NextResponse.json({Error}, {status: 404})
  }
  finally{
    client.close()
  }
}