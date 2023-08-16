import React from 'react';

// Importing page container
import PageContainer from './components/container/PageContainer';

// Importing material ui stuff
import { Grid, Box} from '@mui/material';

// components

// import MonthlyEarnings from './components/dashboard/MonthlyEarnings';
import SalesOverview from './components/dashboard/SalesOverview';
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

async function fetchStudents() {
  const url = `https://management-delta.vercel.app/api/getallstudents`
  const families = await fetch(url,{
    cache: 'no-store',
    method: 'Post',
    headers: {
      'content-type': 'application/json',
      "Access-Control-Allow-Origin": "*" ,
    }
  })
  const jsonFamilies = await families.json()
  return jsonFamilies.students
}


export default async function page() {
  const families = await fetchFamilies()
  const students = await fetchStudents()
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <SalesOverview />
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
