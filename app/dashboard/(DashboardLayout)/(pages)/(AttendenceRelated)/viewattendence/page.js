"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";

// Importing from material ui
import { Box, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material'

// Importing components

// Grades
const Grades = [
    'G-1',
    'G-2',
    'G-3',
    'G-4',
    'G-5',
    'G-6',
    'G-7',
    'G-8',
    'G-9',
    'G-10',
]

// dummy student data
const data = [
  {
    Id: '001',
    Name: 'Saqib',
    Status: "Present"
  },
  {
    Id: '002',
    Name: 'Saqib',
    Status: "Present"
  },
  {
    Id: '003',
    Name: 'Saqib',
    Status: "Absent"
  },
  {
    Id: '004',
    Name: 'Saqib',
    Status: "Present"
  },
  {
    Id: '005',
    Name: 'Saqib',
    Status: "Leave"
  },
  {
    Id: '006',
    Name: 'Saqib',
    Status: "Present"
  },
]

export default function Vewattendence() {
  const pathname = usePathname();
  const pathDirect = pathname;
    let [dateState, setDateState] = useState()
    const [type, setType] = useState('text')
    // const minute = 1000 * 60;
    // const hour = minute * 60;
    // const day = hour * 24;
    // const month = day * 30;
    // const year = day * 365;
    // const date = new Date()
    console.log(dateState)
  return (
    <Grid container spacing={2}>
        <Grid sx={{paddingTop: 0, paddingLeft: 0}} xs={12}>
          <Typography
            fontSize={30}
            textAlign={'center'}
            marginTop={2}
            marginBottom={5}
          >
            Student Attendence
            </Typography>
            <TableContainer
                    sx={{
                           sm:{ width: '100vw',},
                           xs: {width: '95%'},
                            paddingInlineStart: '10px',
                            margin: '2px'
                    }}>
                <Table>
                    <TableHead>
                        <TableRow className='flex gap-1 mb-4'>
                            {Grades.map((Grade, index)=>{
                                return(
                                    // <Link href={'/dashboard/viewattendence'} className='w-20 mt-2 mb-2 border-sky-500 border rounded-full grid place-items-center' key={index}> 
                                    //     <Typography color="textSecondary" fontSize={15} variant="h6">
                                    //         {Grade}
                                    //     </Typography>
                                    // </Link>
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
                                  sx={{backgroundColor: 'skyblue', borderRadius: '50px', textAlign: 'center', paddingBlock: '5px'}}
                                  // target={item.external ? "_blank" : ""}
                                >
                                  <ListItemText sx={{
                                    width: '74px'
                                    
                                }}>
                                    <>Grade {index}</>
                                  </ListItemText>
                                </ListItemButton>
                                </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                </Table>
        </TableContainer>
        <Box paddingInline={2}>
                        {/* <input className='border-gray-800 border-2 p-2' type={type} onFocus={(e)=>{e.preventDefault();setType('date')}} placeholder='Enter Date' value={dateState||''} onChange={(e)=>{
                            e.preventDefault()
                            setDateState(e.target.value)
                        }}/> */}
                  <TextField
                      id="name-basic"
                      value={dateState||''}
                      type='date'
                      variant="outlined"
                      onChange={(e)=>{setDateState(e.target.value)}}
                  />
           </Box>
        <TableContainer
            sx={{
              width: {
                xs: "100%",
                paddingInlineStart: '20px'
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
                <TableCell width={'10px'} align='center'>
                  <Typography color="textSecondary" fontSize={20} variant="h6">
                      Id
                  </Typography>
                </TableCell>
                <TableCell width={'10px'} align='center'>
                  <Typography color="textSecondary" fontSize={20} variant="h6">
                      Name
                  </Typography>
                </TableCell>
                <TableCell width={'20px'} align='center'>
                  <Typography color="textSecondary" fontSize={20} variant="h6">
                      Status
                  </Typography>
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data&&data.map((student)=>{
              return(
                <TableRow key={student.Id}>
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
                    <Typography fontSize="15px" fontWeight={500} color={student.Status==='Present'?'green': student.Status==='Absent'? 'red': 'wheat'}>
                       {student.Status} 
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
        </Grid>
    </Grid>
  )
}
