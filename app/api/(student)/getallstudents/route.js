const { MongoClient, ServerApiVersion } = require("mongodb");
import { NextResponse } from 'next/server'
 
export async function POST(req) {
  const uri = "mongodb+srv://abdulmohizdesigns:mTG87LJR87HlUDvq@abdulmohizdesigns.enjz22u.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    // Handling database connection
    await client.connect();
    const db = client.db('fee_management')
    const collection = db.collection('students')

    // Getting student id from params
    const {searchParams} = new URL(req.url);
    const Class = searchParams.get("class");
    if(Class){
    console.log(Class)
    const getAllStudents = await collection.find({Class}).toArray()
    return NextResponse.json({students: getAllStudents}, {status: 200})
    }

    // Getting all students
    const getAllStudents = await collection.find().toArray()
    return NextResponse.json({students: getAllStudents}, {status: 200})
  } catch(error){
    const Error = "Inter Server Error"
    console.log(error)
    return NextResponse.json({Error}, {status: 404})
  }
  finally{
    client.close()
  }
}