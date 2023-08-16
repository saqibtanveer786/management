"use client"
import React, { useState } from 'react'

// Importing components
import UpdateAndDeleteIcons from './UpdateAndDelete';
import BaseCart from '../app/dashboard/(DashboardLayout)/components/shared/BaseCard'

// Import material ui stuff 
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  TableContainer,
} from "@mui/material";
import Loader from './Loader';


export default function ShowStudents({students}) {
  let [isLoading, setIsLoading] = useState(false)
  let [studentsArray, setStudentsArray] = useState(students)
  return (
    <>
    <BaseCart title={'All Students'}>
          <Loader isLoading={isLoading} message={'deleting Student...'}/>
      <TableContainer
            sx={{
              width: {
                xs: "100vw",
                sm: "100vw",
              },
              height: {
                xs: '500px'
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
                width: {
                  sm: "110vw",
                },
              }}
        >
          <TableHead>
            <TableRow>
                <TableCell>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" fontSize={20} variant="h6">
                      Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" fontSize={20} variant="h6">
                      Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" fontSize={20} variant="h6">
                      Fcode
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" fontSize={20} variant="h6">
                      Class
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" fontSize={20} variant="h6">
                      Per Month
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" fontSize={20} variant="h6">
                      Remainings
                  </Typography>
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsArray&&studentsArray.map((student) => (
              <TableRow key={student.Id} sx={{position: 'relative'}}>
                <TableCell>
                  <UpdateAndDeleteIcons height={'500px'} id={student.Id} data={studentsArray} setData={setStudentsArray} setIsLoading={setIsLoading} url={`https://fee-management-system.vercel.app/api/deletestudent?id=${student.Id}`}/>
                </TableCell>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                     {student.Id} 
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                     {student.Name} 
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                     {student.Fcode} 
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                     {student.Class} 
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                     {student.PerMonth} 
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                     {student.Remainings} 
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCart>
    </>
  )
}
