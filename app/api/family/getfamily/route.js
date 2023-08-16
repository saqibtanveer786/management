const { MongoClient, ServerApiVersion } = require("mongodb");
import { NextResponse } from 'next/server'
 
export async function GET(req) {
  const uri = "mongodb+srv://abdulmohizdesigns:mTG87LJR87HlUDvq@abdulmohizdesigns.enjz22u.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    // Getting student id from params
    const {searchParams} = new URL(req.url);
    const Fcode = searchParams.get("fcode")

    // Handling database connection
    await client.connect();
    const db = client.db('fee_management')
    const collection = db.collection('families')
    const studentCollection = db.collection('students')

    // Getting the student
    const family = await collection.findOne({Fcode})

    // Check if student not exists
    if(!family){
        return NextResponse.json({message: "Family Not found"}, {status: 404})
    }

    // Getting students corresponding to Fcode as childDate
    const childs = await studentCollection.find({Fcode}).toArray()
    // Setting the got data to family as child Data
    family.ChildrenData = childs

    return NextResponse.json({data: family}, {status: 200})
  } catch(error){
    const Error = "Inter Server Error"
    console.log(error)
    return NextResponse.json({Error}, {status: 500})
  }
  finally{
    client.close()
  }
}