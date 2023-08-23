import React from 'react';

// Importing page container
import PageContainer from './components/container/PageContainer';

// Importing material ui stuff
import { Grid, Box } from '@mui/material';

// Importing serverActions
import { getAttendenceData, fetchFamilies, fetchStudents } from "@/serveractions/serverAction"

// import MonthlyEarnings from './components/dashboard/MonthlyEarnings';
import AttendenceOverView from '@/components/AttendenceOverView';
import ShowFamilies from '@/components/ShowFamilies';
import ShowStudents from '@/components/ShowStudents';
import Alerts from '@/components/Alert';

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
            <AttendenceOverView data={attendenceData} />
          </Grid>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={12}>
            <ShowFamilies families={families} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <ShowStudents students={students} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Alerts />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}
