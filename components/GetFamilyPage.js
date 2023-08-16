"use client"
import React, { useState }  from 'react'
import { useRouter } from 'next/navigation';
import {
    Paper,
    Grid,
    Stack,
    TextField,
    Button,
    Box
} from '@mui/material'
import BaseCard from '../app/dashboard/(DashboardLayout)/components/shared/BaseCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Loader from './Loader';
import Alerts from './Alert';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));
  
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function GetFamilyPage() {

    const router = useRouter()

    let obb = {}
    const [responseData, setResponseData] = useState()
    const [Fcode, setFcode] = useState()
    const [familyRecieving, setFamilyRecieving] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState()
    const [alertMessage, setAlertMessage] = useState('')

    function getFcode(e) {
        e.preventDefault()
        let valueToSet = e.target.value
        setFcode(valueToSet)
    }

    async function getFamily(e) {
        e.preventDefault()
        setIsLoading(true)
        const url = `https://fee-management-system.vercel.app/api/family/getfamily?fcode=${Fcode}`
        const family = await fetch(url, {
            method: 'get',
            headers: {
                "Content-Type": 'application/json'
            },
        })
        const jsonFamily = await family.json()
        setIsLoading(false)
        if(!family.ok){
            setShowAlert(true)
            setAlertMessage(jsonFamily.message)
            setAlertSeverity('error')
            setTimeout(() => {
                setShowAlert(false)
            }, 2000);
        }
        
        if(family.ok){
            setResponseData(jsonFamily.data)
            setShowAlert(true)
            setAlertMessage(jsonFamily.message)
            setAlertSeverity('success')
            setTimeout(() => {
                setShowAlert(false)
            }, 2000);

    }
    }
    async function updateData() {

        responseData.Remainings = responseData.Remainings - familyRecieving
        responseData.ChildrenData.forEach((child, index)=>{
            child.Remainings = child.Remainings - obb[child.Id]
        })
        delete responseData._id
        const conf = confirm(`Are you sure with the family remainings: ${responseData.Remainings}
        ${responseData.ChildrenData.map((child)=>{
            return `${child.Name}: ${child.Remainings}`
        })}
        `)
        if(conf){
            setIsLoading(true)
        const url = `https://fee-management-system.vercel.app/api/family/updatefamily`
        const response = await fetch(url, {
            method: 'put',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(responseData)
        })
        setIsLoading(false)
        const jsonResponse = await response.json()
        setResponseData()
        setFcode()

        if (response.ok) {
            setShowAlert(true)
            setAlertMessage(jsonResponse.message)
            setAlertSeverity('success')
            setTimeout(() => {
                setShowAlert(false)
            }, 2000);
        }
        if (!response.ok) {
            setShowAlert(true)
            setAlertMessage(jsonResponse.message)
            setAlertSeverity('error')
            setTimeout(() => {
                setShowAlert(false)
            }, 2000);
        }
    }
}
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Form Layout">
            <Alerts severity={alertSeverity} message={alertMessage} showAlert={showAlert}/>
            <Loader isLoading={isLoading} message={'Searching For Family . . .'}/>
          <>
              <Stack spacing={3}>
                  <TextField
                      id="name-basic"
                      value={Fcode||''}
                      label="Fcode"
                      variant="outlined"
                      onChange={getFcode}
                  />
                  <p id='message' className='hidden'></p>
              
              </Stack>
              <br />
              <Button onClick={getFamily}>
              Search Family
              </Button>
          </>
        </BaseCard>

      </Grid>

      <Box sx={{height: 20}}>
          </Box>

      {responseData&&<Grid item xs={12} lg={8} sx={{marginInline: 'auto'}}>
          
          <BaseCard title="Family Founded">
              <>
                  <Stack spacing={3}>
                      <TextField
                          id="name-basic"
                          label="Identity Name"
                          variant="outlined"
                          value={responseData&&responseData.IdentityName}
                      />
                      <TextField
                          type='number'
                          id="name-basic"
                          label="Remainings"
                          variant="outlined"
                          value={responseData&&responseData.Remainings}
                      />
                      <TextField
                          type='number'
                          id="name-basic"
                          className='atuofill'
                          label="Receiving"
                          variant="outlined"
                          onChange={(e)=>{
                            e.preventDefault()
                            setFamilyRecieving(e.target.value)
                          }}
                      />
                      
                  </Stack>
              </>
          </BaseCard>
      </Grid>
}
      <br />

      {responseData&&responseData.ChildrenData.map((child, index)=>{
          return(
              <Grid item xs={12} lg={6} sx={{marginInline: 'auto'}} key={child.Id}>
          
          <BaseCard title="Child Founded">
              <>
                  <Stack spacing={3}>
                      <TextField
                          id="name-basic"
                          label="Name"
                          variant="outlined"
                          value={child.Name}
                      />
                      <TextField
                          type='number'
                          id="name-basic"
                          label="Remainings"
                          variant="outlined"
                          value={child.Remainings}
                      />
                      <TextField
                          type='number'
                          className={child.Id}
                          id="name-basic"
                          label="Receiving"
                          variant="outlined"
                          onChange={(e)=>{
                            e.preventDefault()
                            obb[child.Id] = e.target.value
                          }}
                      />
                      
                  </Stack>
              </>
          </BaseCard>
      </Grid>
          )
      })}

            <br />
            <Grid item xs={12} lg={6}>
              <Button onClick={updateData} >
              Update
              </Button>
              </Grid>
      </Grid>
  )
}
