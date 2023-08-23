const { MongoClient, ServerApiVersion } = require("mongodb");
import { NextResponse } from 'next/server'
 
export async function POST(req, res) {
  
  const uri = "mongodb+srv://abdulmohizdesigns:mTG87LJR87HlUDvq@abdulmohizdesigns.enjz22u.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    const requestData = await req.json()
    const {Id} = requestData
    
    // Connect the client to the server
    await client.connect();
    const db = client.db('fee_management')
    const collection = db.collection('students')

    // Check either student alredy exists. If exists then returning a message
    const checkEitherStudentAlreadyExists = await collection.findOne({Id})
    if(checkEitherStudentAlreadyExists){
      return NextResponse.json({message: 'Student With This id Already exists'}, {status: 405})
    }

    // Adding student
    const addStudent = await collection.insertOne(requestData)
    return NextResponse.json(
          {
            message: 'Student has successfully added',
           data: addStudent
          },
          {
            status: 200,
          }
       )
  } catch(error){
    const Error = "Inter Server Error"
    console.log(error)
    return NextResponse.json({Error}, {status: 500})
  }
  finally{
    client.close()
  }
}