const { MongoClient, ServerApiVersion } = require("mongodb");
import { NextResponse } from 'next/server'
 
export async function POST(req) {
  const uri = "mongodb+srv://abdulmohizdesigns:mTG87LJR87HlUDvq@abdulmohizdesigns.enjz22u.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    const requestData = await req.json()
    const {Fcode} = requestData
    
    // Connect the client to the server
    await client.connect();
    const db = client.db('fee_management')
    const familyCollection = db.collection('families')
    const studentCollection = db.collection('students')

    // Check either family alredy exists. If exists then returning a message
    const checkEitherFamilyAlreadyExists = await familyCollection.findOne({Fcode})
    if(checkEitherFamilyAlreadyExists){
      return NextResponse.json({message: 'Family With This family code Already exists'}, {status: 405})
    }

    // Getting children data from student collection
    const studentWithFamilyCode = await studentCollection.find({Fcode}).toArray()
    let totalPerMonth = 0
    let totalRemainings = 0
    await studentWithFamilyCode.forEach(async(student)=>{
        totalPerMonth = totalPerMonth + student.PerMonth
          totalRemainings = totalRemainings + student.Remainings
    })

    const familyToAdd = requestData
    familyToAdd.PerMonth = totalPerMonth
    familyToAdd.Remainings = totalRemainings

    // Adding family
    const addFamily = await familyCollection.insertOne(familyToAdd)
    return NextResponse.json({message: 'Family has successfully added', data: addFamily})
  } catch(error){
    const Error = "Inter Server Error"
    console.log(error)
    return NextResponse.json({Error}, {status: 500})
  }
  finally{
    client.close()
  }
}