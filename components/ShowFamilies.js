"use client"
import React, { useState } from "react";
import BaseCard from "../app/dashboard/(DashboardLayout)/components/shared/BaseCard";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  TableContainer,
} from "@mui/material";
import UpdateAndDeleteIcons from "./UpdateAndDelete";
import Loader from "./Loader";
import Search from "./Search";
import { IconButton, Input, Box, Drawer } from "@mui/material";
import { IconSearch, IconX } from "@tabler/icons-react";

const ShowFamilies = ({families}) => {
  let [isLoading, setIsLoading] = useState(false)
  let [dataArray, setDataArray] = useState(families)

  // Function for searching
  function filterData(e) {
    e.preventDefault()
    dataArray.map((item)=>{
      const itemFcode = item.Fcode.toLowerCase()
      const itemName = item.IdentityName.toLowerCase()
      const searchQuery = e.target.value.toLowerCase()
      if (!itemFcode.includes(searchQuery)&& !itemName.includes(searchQuery)) {
        document.getElementById(item.Fcode).classList.add('hidden')
      }
      if (itemFcode.includes(searchQuery)&& itemName.includes(searchQuery)) {
        document.getElementById(item.Fcode).classList.remove('hidden')
      }
    })
  }

  return (
    <>
    <BaseCard title="All Families">

        {/* Loader */}
        <Loader isLoading={isLoading} message={'deleting Family...'}/>

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
                  lg: '100%'
                },
                height: {
                  xs: '500px'
                },
                position: 'relative'

              }}
        >
          <Table
                aria-label="simple table"
                sx={{
                  whiteSpace: "nowrap",
                  mt: 2,
                  width: {
                    sm: "110vw",
                    lg: '100%'
                  },
                }}
          >
            <TableHead>
                <TableRow>
                      <TableCell>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" fontSize={20} variant="h6">
                            Fcode
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" fontSize={20} variant="h6">
                            IdentityName
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
              {dataArray&&dataArray.map((family) => (
                  <TableRow key={family.Fcode} sx={{position: 'relative'}} id={family.Fcode}>
                      <TableCell>
                        <UpdateAndDeleteIcons id={family.Fcode} data={dataArray} setData={setDataArray} url={`https://management-delta.vercel.app/api/family/deletefamily?id=${family.Fcode}`} setIsLoading={setIsLoading}/>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize="15px" fontWeight={500}>
                          {family.Fcode} 
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize="15px" fontWeight={500}>
                          {family.IdentityName} 
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize="15px" fontWeight={500}>
                          {family.PerMonth} 
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize="15px" fontWeight={500}>
                          {family.Remainings} 
                        </Typography>
                      </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </BaseCard>
    </>
  );
};

export default ShowFamilies;
