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
import { IconButton, Input, Drawer } from "@mui/material";
import { IconSearch, IconX } from "@tabler/icons-react";


export default function ShowStudents({students}) {
  let [isLoading, setIsLoading] = useState(false)
  let [studentsArray, setStudentsArray] = useState(students)

  // Function for searching
  function filterData(e) {
    e.preventDefault()
    studentsArray.map((item)=>{
      const itemId = item.Id.toLowerCase()
      const itemName = item.Name.toLowerCase()
      const itemFcode = item.Fcode.toLowerCase()
      const searchQuery = e.target.value.toLowerCase()
      if (!itemId.includes(searchQuery)&& !itemName.includes(searchQuery)&& !itemFcode.includes(searchQuery)) {
        document.getElementById(item.Id).classList.add('hidden')
      }
      if (itemId.includes(searchQuery)&& itemName.includes(searchQuery)&& itemFcode.includes(searchQuery)) {
        document.getElementById(item.Id).classList.remove('hidden')
      }
    })
  }

  return (
    <>
    <BaseCart title={'All Students'}>
          <Loader isLoading={isLoading} message={'deleting Student...'}/>

          {/* Search Box */}
          <Box display={"flex"} gap={2}>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              aria-controls="search-menu"
              aria-haspopup="true"
              size="large"
            >
                <IconSearch height="20" width="20" strokeWidth="1.5" />
            </IconButton>

              <Box display="flex" alignItems="center">
                <Input placeholder="Search here" aria-label="description" sx={{width: "40vw", paddingInline: 1}} onChange={filterData}/>
              </Box>
          </Box>

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
              <TableRow key={student.Id} sx={{position: 'relative'}} id={student.Id}>
                <TableCell>
                  <UpdateAndDeleteIcons height={'500px'} id={student.Id} data={studentsArray} setData={setStudentsArray} setIsLoading={setIsLoading} url={`https://management-delta.vercel.app/api/deletestudent?id=${student.Id}`}/>
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
