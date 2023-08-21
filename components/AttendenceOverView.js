"use client"
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";
import BaseCard from "../app/dashboard/(DashboardLayout)/components/shared/DashboardCard";
import { Button } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AttendenceOverView = ({data}) => {
  // defining states
  const [attendenceData, setAttendenceData] = useState(data)


  // Importing stuff from theme
  const theme = useTheme();
  const success = theme.palette.success.main;
  const error = theme.palette.error.main;
  const warning = theme.palette.warning.main;

  const optionssalesoverview = {
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        endingShape: "rounded",
        borderRadius: 5,
      },
    },

    colors: [success, error, warning],
    fill: {
      type: "solid",
      opacity: 1,
    },
    chart: {
      offsetX: -15,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "inherit",
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: true,
    },
    xaxis: {
      type: "category",
      categories: [
        "Grade-1",
        "Grade-2",
        "Grade-3",
        "Grade-4",
        "Grade-5",
        "Grade-6",
        "Grade-7",
        "Grade-8",
        "Grade-9",
        "Grade-10",
      ],
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    yaxis: {
      show: true,
      min: 0,
      max: 50,
      tickAmount: 10,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: {
      theme: "dark",
    },
  };
  const seriessalesoverview = [
    {
      Status: "Presents",
      data: [36,36,36,36,36,36,36,36,36,36,],
    },
    {
      Status: "Apsents",
      data: [7,15,12,25,14,5,8,23,10,9,],
    },
    {
      Status: "On Leave",
      data: [5,10,30,5,7,9,8,5,9,7,],
    },
  ];
  return (
    <BaseCard title="Attendence Overview">
      <Chart
        options={optionssalesoverview}
        series={seriessalesoverview}
        type="bar"
        height="295px"
        
      />
    </BaseCard>
  );
};

export default AttendenceOverView;
