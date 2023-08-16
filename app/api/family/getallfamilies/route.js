const { MongoClient, ServerApiVersion } = require("mongodb");
import { NextResponse } from 'next/server'
 
export async function POST() {
  const uri = "mongodb+srv://abdulmohizdesigns:mTG87LJR87HlUDvq@abdulmohizdesigns.enjz22u.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    // Handling database connection
    await client.connect();
    const db = client.db('fee_management')
    const collection = db.collection('families')

    // Getting all students
    const getAllfamilies = await collection.find().toArray()
    return NextResponse.json({families: getAllfamilies}, {status: 200})
  } catch(error){
    const Error = "Inter Server Error"
    console.log(error)
    return NextResponse.json({Error}, {status: 404})
  }
  finally{
    client.close()
  }
}