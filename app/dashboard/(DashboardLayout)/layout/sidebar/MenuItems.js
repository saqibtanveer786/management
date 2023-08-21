import {
  IconTextPlus, IconHome, IconCalculator, IconLayoutGrid,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

export const HomeItems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/dashboard",
  },
];

export const AddmissionItems = [
  {
    id: uniqueId(),
    title: "Add Family",
    icon: IconTextPlus,
    href: "/dashboard/addfamily",
  },
  {
    id: uniqueId(),
    title: "Add Student",
    icon: IconTextPlus,
    href: "/dashboard/addstudent",
  },
];

export const ViewItems = [
  {
    id: uniqueId(),
    title: "All Families",
    icon: IconLayoutGrid,
    href: "/dashboard/showallfamilies",
  },
  {
    id: uniqueId(),
    title: "All Students",
    icon: IconLayoutGrid,
    href: "/dashboard/showallstudents",
  },
];

export const AttendenceItems = [
  {
    id: uniqueId(),
    title: "View Attendence",
    icon: IconLayoutGrid,
    href: "/dashboard/viewattendence",
  },
  {
    id: uniqueId(),
    title: "Mark Attendence",
    icon: IconLayoutGrid,
    href: "/dashboard/markattendence",
  },
];

export const SubmitfeeItems = [
  {
    id: uniqueId(),
    title: "Submit Fee",
    icon: IconCalculator,
    href: "/dashboard/submitfee",
  },
];

