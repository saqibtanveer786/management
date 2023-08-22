const { MongoClient, ServerApiVersion } = require("mongodb");
import { NextResponse } from 'next/server'
 
export async function DELETE(req) {
  const uri = "mongodb+srv://abdulmohizdesigns:mTG87LJR87HlUDvq@abdulmohizdesigns.enjz22u.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    // Getting search param from url
    const {searchParams} = new URL(req.url);
    const Id = searchParams.get("id");

    // Handling database connection
    await client.connect();
    const db = client.db('fee_management')
    const collection = db.collection('students')

    // Check exists or not to which we have to delete. If exists then return message
    const chechEitherStudentExists = await collection.findOne({Id})
    if(!chechEitherStudentExists){
        return NextResponse.json({message: "No student with this id"}, {status: 405}) 
    }

    // Deleting the student
    const deleteStudent = await collection.deleteOne({Id})
    return NextResponse.json(
      {
        message: "Student has successfully deleted",
        data: deleteStudent
      },
      {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': true,
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        }
      }
    )
  } catch(error){
    const Error = "Inter Server Error"
    console.log(error)
    return NextResponse.json({Error}, {status: 404})
  }
  finally{
    client.close()
  }
}