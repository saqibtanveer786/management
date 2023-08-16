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

const ShowFamilies = ({families}) => {
  let [isLoading, setIsLoading] = useState(false)
  let [dataArray, setDataArray] = useState(families)
  return (
    <>
    <BaseCard title="All Families">
      <Loader isLoading={isLoading} message={'deleting Family...'}/>
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
              <TableRow key={family.Id} sx={{position: 'relative'}}>
                <TableCell>
                  <UpdateAndDeleteIcons id={family.Fcode} data={dataArray} setData={setDataArray} url={`https://fee-management-system.vercel.app/api/family/deletefamily?id=${family.Fcode}`} setIsLoading={setIsLoading}/>
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
