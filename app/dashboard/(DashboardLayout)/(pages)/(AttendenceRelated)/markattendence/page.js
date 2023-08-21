"use client"
import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Select, MenuItem, Typography, FormControl, InputLabel } from '@mui/material';

// Importing  components
import BaseCard from '../../../components/shared/BaseCard'

function EnterAttendance() {
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceData, setAttendanceData] = useState({});
  const [data, setData] = useState();
  const date = new Date() 
  const [ currentDate, setCurrentDate ] = useState(`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`)

  // Making Date
  // const formattedDate = 
  


  const handleClassSelect = async(e) => {
    const date = new Date()
    const currentDate = date.toISOString().split('T')[0]
    await setSelectedClass(e.target.value);
    console.log('selected class',e.target.value)
    const url = `http://localhost:3000/api/getallstudents?class=${e.target.value}&date=${currentDate}`
    const response = await fetch(url, {
      cache: 'no-store',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const jsonResponse = await response.json()
    console.log(jsonResponse)
    if(response.ok){
      setData(jsonResponse.students)
    }
  };

  const handleAttendanceChange = (Id, name,status,Class) => {
    setAttendanceData({
      ...attendanceData,
      [Id]: {
        Id: Id,
        Name: name,
        Status: status,
        Class: Class,
        Date: currentDate
      },
  });
  setTimeout(() => {
    
    console.log(attendanceData)
  }, 500);
  };
  

  const handleSubmit = async () => {
    const url = `http://localhost:3000/api/attendence/submitattendence`
    const AttendenceArray = Object.values(attendanceData)
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(AttendenceArray)
    })
    const jsonResponse = await response.json()
    console.log(jsonResponse)
    if(response.ok){
      setAttendanceData({})
    }
  };

  return (
    <>
    <Typography
      fontSize={30}
      textAlign={'center'}
      marginTop={2}
      marginBottom={2}
    >
      Student Attendence
      </Typography>

      <FormControl sx={{width: '100%', paddingBottom: 2}}>
        <InputLabel sx={{backgroundColor: 'white'}}>Select Class</InputLabel>
        <Select
          value={selectedClass||''}
          onChange={handleClassSelect}
        >
          <MenuItem value="">
            <em>Select Class</em>
          </MenuItem>
          {Array.from({ length: 10 }, (_, index) => (
            <MenuItem key={index} value={`Grade${index}`}>
              Class {index}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedClass && (
      <BaseCard title={`Mark Attendance for ${selectedClass}`}>
          <TableContainer >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Student ID</TableCell>
                  <TableCell align='center'>Student Name</TableCell>
                  <TableCell align='center'>Attendance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data&& data.map((item) => (
                  <TableRow key={item.Id}>
                    <TableCell align='center'>{item.Id}</TableCell>
                    <TableCell align='center'>{item.Name}</TableCell>
                    <TableCell align='center' sx={{paddingInline: 0}}>
                      <Checkbox
                        defaultValue={'normal'}
                        checked={attendanceData[item.Id]?.Status === 'present'}
                        onChange={() => handleAttendanceChange(item.Id, item.Name ,'present', item.Class)}
                        sx={{ color: 'green', paddingInline: '3px'  }}
                      />
                      <Checkbox
                        defaultValue={'normal'}
                        checked={attendanceData[item.Id]?.Status === 'absent'}
                        onChange={() => handleAttendanceChange(item.Id, item.Name ,'absent', item.Class)}
                        sx={{ color: 'red', paddingInline: '3px'  }}
                      />
                      <Checkbox
                        defaultValue={'normal'}
                        checked={attendanceData[item.Id]?.Status === 'onleave'}
                        onChange={() => handleAttendanceChange(item.Id, item.Name ,'onleave', item.Class)}
                        sx={{ color: 'gray', paddingInline: '3px' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={handleSubmit} variant="outlined">Submit</Button>
        </BaseCard>
      )}
    </>
  );
}

export default EnterAttendance;
