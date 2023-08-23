'use client';

// Import matrial ui stuff
import {
    Paper,
    Grid,
    Stack,
    TextField,
    Button,
} from '@mui/material'

// Importing components
import BaseCard from '../../../components/shared/BaseCard';

// styling
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));
  
  const darkTheme = createTheme({ palette: { mode: 'dark' } });
  const lightTheme = createTheme({ palette: { mode: 'light' } });
  
  // Importing hooks
import { useState } from 'react';
import Loader from '@/components/Loader';
import { parseInt } from 'lodash';
import Alerts from '@/components/Alert';

// Import server actions
import { addStudent } from '@/serveractions/serverAction';


// Main function
const AddStudent = () => {
  let [ data, setData] = useState({})
  const [ isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState()
  const [alertMessage, setAlertMessage] = useState('')

  function getData(e) {
    e.preventDefault()
    setData({...data, [e.target.name]: e.target.name === "PerMonth" || e.target.name === "Remainings"
    ? parseInt(e.target.value)
    : e.target.value})
  }


  // Function for adding student
  // async function addStudent() {
  //   const url = `https://management-delta.vercel.app/api/addstudent`
  //   setIsLoading(true)
  //   const response = await fetch(url, {
  //     cache: 'no-cache',
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Access-Control-Allow-Origin": "*" ,
  //     },
  //     body: JSON.stringify(data)
  //   })
  //   setIsLoading(false)
  //   console.log(response)
  //   const jsonResponse = await response.json()
  //   setData({})
  //   if(response.ok){
  //     setShowAlert(true)
  //     setAlertMessage(jsonResponse.message)
  //     setAlertSeverity('success')
  //     setTimeout(() => {
  //         setShowAlert(false)
  //     }, 2000);
  //   }
  //   if(!response.ok){
  //     setShowAlert(true)
  //     setAlertMessage(jsonResponse.message)
  //     setAlertSeverity('error')
  //     setTimeout(() => {
  //         setShowAlert(false)
  //     }, 2000);
  //   }
  // }

    return (
      <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Add Student">
            <Alerts severity={alertSeverity} message={alertMessage} showAlert={showAlert}/>
            <Loader isLoading={isLoading} message={'Adding Student . . . . .'}/>
            <>
            <Stack spacing={3}>
              <TextField
                id="name-basic"
                name='Id'
                value={data.Id||''}
                label="Id"
                variant="outlined"
                onChange={getData}
              />
              <TextField 
                id="name-basic" 
                name='Fcode'
                value={data.Fcode||''}
                label="Fcode" 
                variant="outlined"
                onChange={getData}
              />
              <TextField 
                id="name-basic" 
                name='Name'
                value={data.Name||''}
                label="Name" 
                variant="outlined"
                onChange={getData}
              />
              <TextField 
                id="name-basic" 
                name='Class'
                value={data.Class||''}
                label="Class" 
                variant="outlined"
                onChange={getData}
              />
              <TextField 
                id="name-basic" 
                name='PerMonth'
                value={data.PerMonth||''}
                label="PerMonth" 
                type='number'
                variant="outlined"
                onChange={getData}
              />
              <TextField 
                id="name-basic" 
                name='Remainings'
                value={data.Remainings||''}
                label="Remainings" 
                type='number'
                variant="outlined"
                onChange={getData}
              />
            </Stack>
            <br />
            <Button onClick={(e)=>{
              e.preventDefault()
              addStudent(data)
            }}>
              Submit
            </Button>
            </>
          </BaseCard>
        </Grid>
      </Grid>
      </>
    );
  };
  
  export default AddStudent;