import React from 'react';

// Importing page container
import PageContainer from './components/container/PageContainer';

// Importing material ui stuff
import { Grid, Box} from '@mui/material';

// components

// import MonthlyEarnings from './components/dashboard/MonthlyEarnings';
import AttendenceOverView from '../../../components/AttendenceOverView';
import ShowFamilies from '../../../components/ShowFamilies';
import ShowStudents from '@/components/ShowStudents';
import Alerts from '@/components/Alert';

// Getting families 
async function fetchFamilies() {
  const url = `https://management-delta.vercel.app/api/family/getallfamilies`
  const families = await fetch(url,{
    cache: 'no-store',
    method: 'Post',
    headers: {
      'content-type': 'application/json',
      "Access-Control-Allow-Origin": "*" ,
    }
  })
  const jsonFamilies = await families.json()
  return jsonFamilies.families
}

// Getting Students 
async function fetchStudents() {
  const url = `https://management-delta.vercel.app/api/getallstudents`
  const students = await fetch(url,{
    cache: 'no-store',
    method: 'Post',
    headers: {
      'content-type': 'application/json',
      "Access-Control-Allow-Origin": "*" ,
    }
  })
  const jsonStudents = await students.json()
  return jsonStudents.students
}

// Getting Student Attendence Data 
async function getAttendenceData(date) {
  let currentDate = date.toISOString().split('T')[0]
  console.log(currentDate)
  const url = `http://localhost:3000/api/attendence/getattendence?date=${currentDate}&forchart=yes`
  const attendenceData = await fetch(url,{
    cache: 'no-store',
    method: 'Post',
    headers: {
      'content-type': 'application/json',
      "Access-Control-Allow-Origin": "*" ,
    }
  })
  const jsonAttendenceData = await attendenceData.json()

  const lengths = {}
  for (const item in jsonAttendenceData) {
      if (jsonAttendenceData.hasOwnProperty(item)) {
        lengths[item] = jsonAttendenceData[item].map(subItem => Array.isArray(subItem)? subItem.length: 0)
      }
  }

  return lengths
}

export default async function page() {
  let date = new Date()
  const attendenceData = await getAttendenceData(date)
  const families = await fetchFamilies()
  const students = await fetchStudents()
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <AttendenceOverView data={attendenceData}/>
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <ShowFamilies families={families}/>
        </Grid>
        <Grid item xs={12} lg={12}>
          <ShowStudents students={students}/>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Alerts/>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
  )
}
