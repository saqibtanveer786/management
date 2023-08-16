'use client';

// Importing material ui stuff
import {
    Paper,
    Grid,
    Stack,
    TextField,
    Button,
} from '@mui/material'


// Importing components
import BaseCard from '../../../components/shared/BaseCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useState } from 'react';
import Loader from '@/components/Loader';
import Alerts from '@/components/Alert';

// Styling
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });


export default function AddingFamily() {
  let [data, setData ] = useState({})
  let [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState()
  const [alertMessage, setAlertMessage] = useState('')

  function getData(e) {
    e.preventDefault()
    setData({...data, [e.target.name]: e.target.value})
  }

  // Function for adding family
  async function addFamily(data) {
    setIsLoading(true)
    const url = `https://fee-management-system.vercel.app/api/family/addfamily`
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    setIsLoading(false)
    const jsonResponse = await response.json()
    setData({})
    if(response.ok){
      setShowAlert(true)
      setAlertMessage(jsonResponse.message)
      setAlertSeverity('success')
      setTimeout(() => {
          setShowAlert(false)
      }, 2000);
    }
    if(!response.ok){
      setShowAlert(true)
      setAlertMessage(jsonResponse.message)
      setAlertSeverity('error')
      setTimeout(() => {
          setShowAlert(false)
      }, 2000);
    }
  }

  return (
    <Grid id='parent'>
      <Grid container item xs={12} lg={12} sx={{padding: 4}}>
        <BaseCard title="Add Family">
            <Alerts severity={alertSeverity} message={alertMessage} showAlert={showAlert}/>
          <Loader isLoading={isLoading} message={'Adding Family . . . . . .'}/>
          <>
          <Stack spacing={2}>
            <TextField 
              value={data.Fcode||''}
              id="name-basic" 
              label="Fcode" 
              variant="outlined"
              name='Fcode'
              onChange={getData}
            />
            <TextField 
              value={data.IdentityName||''}
              id="name-basic" 
              label="IdentityName" 
              variant="outlined"
              name='IdentityName'
              onChange={getData}
            />
          </Stack>
          <br />
          <Button onClick={async(e)=>{
            e.preventDefault()
            setIsLoading(true)
           const wait = await addFamily(data)
           setIsLoading(false)
          }}>
            Submit
          </Button>
          </>
        </BaseCard>
      </Grid>
    </Grid>
  )
}
