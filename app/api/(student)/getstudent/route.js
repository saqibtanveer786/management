const { MongoClient, ServerApiVersion } = require("mongodb");
import { NextResponse } from 'next/server'
 
export async function GET(req) {
  const uri = "mongodb+srv://abdulmohizdesigns:mTG87LJR87HlUDvq@abdulmohizdesigns.enjz22u.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    // Getting student id from params
    const {searchParams} = new URL(req.url);
    const student_id = searchParams.get("student_id");

    // Handling database connection
    await client.connect();
    const db = client.db('fee_management')
    const collection = db.collection('students')

    // Getting the student
    const getStudent = await collection.findOne({student_id})

    // Check if student not exists
    if(!getStudent){
        return NextResponse.json({message: "Student Not found"}, {status: 404})
    }

    return NextResponse.json({data: getStudent}, {status: 200})
  } catch(error){
    const Error = "Inter Server Error"
    return NextResponse.json({Error}, {status: 500})
  }
  finally{
    client.close()
  }
}