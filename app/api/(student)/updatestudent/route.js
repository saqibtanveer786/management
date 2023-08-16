const { MongoClient, ServerApiVersion } = require("mongodb");
import { NextResponse } from 'next/server'
 
export async function PUT(req) {
  const uri = "mongodb+srv://abdulmohizdesigns:mTG87LJR87HlUDvq@abdulmohizdesigns.enjz22u.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    const requestData = await req.json()
    
    // Getting search param from url
    const {searchParams} = new URL(req.url);
    const student_id = searchParams.get("student_id");
    
    // Handling database connection
    await client.connect();
    const db = client.db('fee_management')
    const collection = db.collection('students')

    // Check either student exists or not. If not then returning a message
    const checkEitherStudentExistsOrNot = await collection.findOne({student_id: requestData.student_id})
    if(!checkEitherStudentExistsOrNot){
      return NextResponse.json({message: 'No student with this id'}, {status: 405})
    }

    // Adding student
    const updateStudent = await collection.updateOne({student_id: student_id}, {$set:requestData}, { upsert: true })
    return NextResponse.json({message: 'Student has successfully updated', data: updateStudent})
  } catch(error){
    const Error = "Inter Server Error"
    console.log(error)
    return NextResponse.json({Error, error}, {status: 404})
  }
  finally{
    client.close()
  }
}