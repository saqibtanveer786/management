const { MongoClient, ServerApiVersion } = require("mongodb");
import { NextResponse } from 'next/server'
 
export async function POST(req) {
  const uri = "mongodb+srv://abdulmohizdesigns:mTG87LJR87HlUDvq@abdulmohizdesigns.enjz22u.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    // Handling database connection
    await client.connect();
    const db = client.db('fee_management')
    const collection = db.collection('attendence')

    // Getting student id from params
    const {searchParams} = new URL(req.url);
    const Class = searchParams.get("class");
    const date = searchParams.get("date");
    const forChart = searchParams.get("forchart");

    if (forChart&&date) {
      const  grade1Present = await collection.find({Date: date, Status: 'present', Class: 'Grade1' }).toArray()
      const  grade2Present = await collection.find({Date: date, Status: 'present', Class: 'Grade2' }).toArray()
      const  grade3Present = await collection.find({Date: date, Status: 'present', Class: 'Grade3' }).toArray()
      const  grade4Present = await collection.find({Date: date, Status: 'present', Class: 'Grade4' }).toArray()
      const  grade5Present = await collection.find({Date: date, Status: 'present', Class: 'Grade5' }).toArray()
      const  grade6Present = await collection.find({Date: date, Status: 'present', Class: 'Grade6' }).toArray()
      const  grade7Present = await collection.find({Date: date, Status: 'present', Class: 'Grade7' }).toArray()
      const  grade8Present = await collection.find({Date: date, Status: 'present', Class: 'Grade8' }).toArray()
      const  grade9Present = await collection.find({Date: date, Status: 'present', Class: 'Grade9' }).toArray()
      const  grade10Present = await  collection.find({Date: date, Status: 'present', Class: 'Grade10' }).toArray()
    
      const  grade1Absents = await collection.find({Date: date, Status: 'absent', Class: 'Grade1' }).toArray()
      const  grade2Absents = await collection.find({Date: date, Status: 'absent', Class: 'Grade2' }).toArray()
      const  grade3Absents = await collection.find({Date: date, Status: 'absent', Class: 'Grade3' }).toArray()
      const  grade4Absents = await collection.find({Date: date, Status: 'absent', Class: 'Grade4' }).toArray()
      const  grade5Absents = await collection.find({Date: date, Status: 'absent', Class: 'Grade5' }).toArray()
      const  grade6Absents = await collection.find({Date: date, Status: 'absent', Class: 'Grade6' }).toArray()
      const  grade7Absents = await collection.find({Date: date, Status: 'absent', Class: 'Grade7' }).toArray()
      const  grade8Absents = await collection.find({Date: date, Status: 'absent', Class: 'Grade8' }).toArray()
      const  grade9Absents = await collection.find({Date: date, Status: 'absent', Class: 'Grade9' }).toArray()
      const  grade10Absents = await  collection.find({Date: date, Status: 'absent', Class: 'Grade10' }).toArray()
    
      const  grade1Onleave = await collection.find({Date: date, Status: 'onleave', Class: 'Grade1' }).toArray()
      const  grade2Onleave = await collection.find({Date: date, Status: 'onleave', Class: 'Grade2' }).toArray()
      const  grade3Onleave = await collection.find({Date: date, Status: 'onleave', Class: 'Grade3' }).toArray()
      const  grade4Onleave = await collection.find({Date: date, Status: 'onleave', Class: 'Grade4' }).toArray()
      const  grade5Onleave = await collection.find({Date: date, Status: 'onleave', Class: 'Grade5' }).toArray()
      const  grade6Onleave = await collection.find({Date: date, Status: 'onleave', Class: 'Grade6' }).toArray()
      const  grade7Onleave = await collection.find({Date: date, Status: 'onleave', Class: 'Grade7' }).toArray()
      const  grade8Onleave = await collection.find({Date: date, Status: 'onleave', Class: 'Grade8' }).toArray()
      const  grade9Onleave = await collection.find({Date: date, Status: 'onleave', Class: 'Grade9' }).toArray()
      const  grade10Onleave = await  collection.find({Date: date, Status: 'onleave', Class: 'Grade10' }).toArray()

      const presents = [
        grade1Present,
        grade2Present,
        grade3Present,
        grade4Present,
        grade5Present,
        grade6Present,
        grade7Present,
        grade8Present,
        grade9Present,
        grade10Present,
      ]
      
      const absents = [
        grade1Absents,
        grade2Absents,
        grade3Absents,
        grade4Absents,
        grade5Absents,
        grade6Absents,
        grade7Absents,
        grade8Absents,
        grade9Absents,
        grade10Absents,
      ]
      const onleave = [
        grade1Onleave,
        grade2Onleave,
        grade3Onleave,
        grade4Onleave,
        grade5Onleave,
        grade6Onleave,
        grade7Onleave,
        grade8Onleave,
        grade9Onleave,
        grade10Onleave,
      ]


        //       const forChart = searchParams.get("forchart");

        // if (forChart && date) {
        //   const statusTypes = ['present', 'absent', 'onleave'];
        //   const gradeTypes = ['Grade1', 'Grade2', 'Grade3', 'Grade4', 'Grade5', 'Grade6', 'Grade7', 'Grade8', 'Grade9', 'Grade10'];

        //   const data = {};

        //   for (const grade of gradeTypes) {
        //     data[grade] = {};
        //     for (const status of statusTypes) {
        //       const count = await collection.countDocuments({ Date: date, Status: status, Class: grade });
        //       data[grade][status] = count;
        //     }
        //   }

        //   return NextResponse.json(data, { status: 200 });
        // }

        
      return NextResponse.json({presents, absents, onleave}, {status: 200})
    }

    if(date && Class){
      console.log(date, Class)
      const getAllStudents = await collection.find({Date: date, Class}).toArray()
      return NextResponse.json({students: getAllStudents}, {status: 200})
    }

    if(date){
      const getAllStudents = await collection.find({Date: date}).toArray()
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