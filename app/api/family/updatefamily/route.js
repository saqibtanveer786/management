const { MongoClient, ServerApiVersion } = require("mongodb");
import { NextResponse } from 'next/server'
 
export async function PUT(req) {
  const uri = "mongodb+srv://abdulmohizdesigns:mTG87LJR87HlUDvq@abdulmohizdesigns.enjz22u.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    const requestData = await req.json()
    
    // Handling database connection
    await client.connect();
    const db = client.db('fee_management')
    const collection = db.collection('families')
    const studentCollection = db.collection('students')
    
    requestData.ChildrenData.forEach(async (child)=>{
          delete child._id
          const updateStudent = await studentCollection.updateOne({Id: child.Id}, {$set: child}, {upsert: true})
    })
    
    delete requestData.ChildrenData
    const updateFamily = await collection.updateOne({Fcode: requestData.Fcode}, {$set:requestData}, { upsert: true })
    return NextResponse.json({message: 'Family has successfully updated', data: updateFamily})
  } catch(error){
    const Error = "Inter Server Error"
    console.log(error)
    return NextResponse.json({Error, error}, {status: 404})
  }
  finally{
    client.close()
  }
}