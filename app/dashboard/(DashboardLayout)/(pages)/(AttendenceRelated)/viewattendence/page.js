"use client"
import React, { useEffect, useState } from 'react'

import Link from 'next/link'

// Importing hooks
import { usePathname } from "next/navigation";

// Importing from material ui
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, ListItemButton, TextField, ListItemText } from '@mui/material'

// Importing components
import BaseCard from '../../../components/shared/BaseCard'
import Loader from '@/components/Loader';
import Alerts from '@/components/Alert';

// Grades or classes names
const Grades = [
    'Grade1',
    'Grade2',
    'Grade3',
    'Grade4',
    'Grade5',
    'Grade6',
    'Grade7',
    'Grade8',
    'Grade9',
    'Grade10',
]

export default function Vewattendence() {
    // initializing use pathhook
    const pathname = usePathname();
    const pathDirect = pathname;

    // initializing date
    const date = new Date()

    // making states
    const [isLoading, setIsLoading] = useState(false)
    const [loaderMessage, setLoaderMessage] = useState('Getting Attendence')
    const [showAlert, setShowAlert] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState('success')
    const [alertMessage, setAlertMessage] = useState('')
    const [currentDate, setCurrentDate ] = useState(date.toISOString().split('T')[0])
    const [currentGrade, setCurrentGrade] = useState('Grade8')
    const [data, setData] = useState()

    // Function to get data
    async function getData() {
      const url = `https://management-delta.vercel.app/api/attendence/getattendence?class=${currentGrade}&date=${currentDate}`
      setIsLoading(true)
      const response = await fetch(url, {
        cache: 'no-store',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const jsonResponse = await response.json()
      setIsLoading(false)
      if(response.ok){
        console.log(jsonResponse)
        setData(jsonResponse.students)
      }
      if(!jsonResponse.students){
          setAlertMessage(`Nothing founded for ${currentGrade} at date ${currentDate}`)
          setShowAlert(true)
          setTimeout(() => {
            setShowAlert(false)
          }, 1000);
      }
    }

    useEffect(()=>{
      !data&&getData()
    },[])
    
  return (
   <BaseCard> 
    <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Top heading */}
            <Typography
              fontSize={30}
              textAlign={'center'}
              marginTop={2}
              marginBottom={5}
            >
              Student Attendence
              </Typography>

          {/* Grades List */}
              <TableContainer
                      sx={{
                              // paddingInline: '10px',
                              margin: '2px',
                      }}>
                  <Table>
                  <TableHead>
                      <TableRow className='flex gap-1 mb-4'>
                          {Grades.map((Grade, index)=>{
                              return(
                                  <TableCell
                                  key={index}
                                  padding={0}
                                  sx={{
                                    display: 'flex',
                                    padding: '0px'
                                  }}
                                  >
                                  
                                <ListItemButton
                                component={Link}
                                href={'#'}
                                selected={pathDirect === '#'}
                                sx={{borderRadius: '50px', textAlign: 'center', paddingBlock: '0px'}}
                                // target={item.external ? "_blank" : ""}
                                onClick={(e)=>{
                                e.preventDefault()
                                getData()
                                }}
                              >
                                <ListItemText sx={{
                                  width: '70px'
                                  
                              }}>
                                  <>{Grade}</>
                                </ListItemText>
                              </ListItemButton>
                              </TableCell>
                              )
                          })}
                      </TableRow>
                  </TableHead>
                </Table>
          </TableContainer>

          {/* Date Input */}
            <Box paddingInline={2}>
                      <TextField
                          id="name-basic"
                          value={currentDate||''}
                          type='date'
                          variant="outlined"
                          onChange={(e)=>{
                            e.preventDefault()
                            const date = new Date(e.target.value)
                            setCurrentDate(date.toISOString().split('T')[0])
                            console.log('dsfjsdjf',currentDate)
                          }}
                      />
              </Box>
          
          {/* Current Grade Heading */}
            <Typography
              fontSize={15}
              textAlign={'left'}
              paddingLeft={5}
              marginTop={'15px'}
              marginBottom={'5px'}
              color={'03c9d7'}
            >
              {currentGrade}
              </Typography>

          {/* Loader and Alert*/}
          <Loader isLoading={isLoading} message={loaderMessage}/>
          <Alerts showAlert={showAlert} message={alertMessage} severity={alertSeverity}/>

            {/* Showing Attendence */}
          {data&&<TableContainer
                sx={{
                  width: {
                    xs: "100%",
                    // sm: "100vw",
                  },
                  position: 'relative'
                  // overflowY: 'scroll',
                  // overflowX: 'scroll'

                }}
        >
          <Table
                aria-label="simple table"
                sx={{
                  whiteSpace: "nowrap",
                  mt: 2,
                }}
          >
            <TableHead>
              <TableRow>
                  <TableCell width={'10px'} align='center' sx={{paddingTop: 0}}>
                    <Typography color="textSecondary" fontSize={20} variant="h6">
                        Id
                    </Typography>
                  </TableCell>
                  <TableCell width={'10px'} align='center' sx={{paddingTop: 0}}>
                    <Typography color="textSecondary" fontSize={20} variant="h6">
                        Name
                    </Typography>
                  </TableCell>
                  <TableCell width={'20px'} align='center' sx={{paddingTop: 0}}>
                    <Typography color="textSecondary" fontSize={20} variant="h6">
                        Status
                    </Typography>
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data&&data.map((student, index)=>{
                return(
                  <TableRow key={index}>
                    <TableCell align='center'>
                      <Typography fontSize="15px" fontWeight={500}>
                        {student.Id} 
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography fontSize="15px" fontWeight={500}>
                        {student.Name} 
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography fontSize="15px" fontWeight={500} color={student.Status==='present'?'green': student.Status==='absent'? 'red': 'wheat'}>
                        {student.Status} 
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>}
          </Grid>
      </Grid>
      </BaseCard>
  )
}
