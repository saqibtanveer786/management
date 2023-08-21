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
    const studentsCollection = db.collection('students')

    // Getting all families
      const getAllFamilies = await collection.find().toArray();

      for (const family of getAllFamilies) {
        const studentForSameFcode = await studentsCollection.find({ Fcode: family.Fcode }).toArray();

        let calculatedRemaining = 0;
        for (const student of studentForSameFcode) {
          calculatedRemaining += student.Remainings;
        }

        family.Remainings = calculatedRemaining;
      }
    return NextResponse.json({families: getAllFamilies}, {status: 200})
  } catch(error){
    const Error = "Inter Server Error"
    console.log(error)
    return NextResponse.json({Error}, {status: 404})
  }
  finally{
    client.close()
  }
}