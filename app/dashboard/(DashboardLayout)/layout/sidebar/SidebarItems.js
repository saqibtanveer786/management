import React from "react";
import {HomeItems, AddmissionItems, ViewItems, SubmitfeeItems} from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List, Typography } from "@mui/material";
import NavItem from "./NavItem";
import Link from "next/link";
import {
  IconCalculator
} from "@tabler/icons-react"

const SidebarItems = ({ toggleMobileSidebar }) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  
  return (
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 0 }} component="div">
        <Typography sx={{paddingBlock: 2}}>
          Home
        </Typography>
        {HomeItems.map((item) => {
          // {/********SubHeader**********/}
          // if (item.subheader) {
          //   return <NavGroup item={item} key={item.subheader} />;

          //   // {/********If Sub Menu**********/}
          //   /* eslint no-else-return: "off" */
          // } else {
            return (
              <>
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
              </>
            );
          
        })}
        <Typography sx={{paddingBlock: 2}}>
          Admission
        </Typography>
        {AddmissionItems.map((item) => {
          // {/********SubHeader**********/}
          // if (item.subheader) {
          //   return <NavGroup item={item} key={item.subheader} />;

          //   // {/********If Sub Menu**********/}
          //   /* eslint no-else-return: "off" */
          // } else {
            return (
              <>
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
              </>
            );
          
        })}
        <Typography sx={{paddingBlock: 2}}>
          View
        </Typography>
        {ViewItems.map((item) => {
          // {/********SubHeader**********/}
          // if (item.subheader) {
          //   return <NavGroup item={item} key={item.subheader} />;

          //   // {/********If Sub Menu**********/}
          //   /* eslint no-else-return: "off" */
          // } else {
            return (
              <>
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
              </>
            );
          
        })}
        <Typography sx={{paddingBlock: 2}}>
          Submit
        </Typography>
        {SubmitfeeItems.map((item) => {
          // {/********SubHeader**********/}
          // if (item.subheader) {
          //   return <NavGroup item={item} key={item.subheader} />;

          //   // {/********If Sub Menu**********/}
          //   /* eslint no-else-return: "off" */
          // } else {
            return (
              <>
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
              </>
            );
          
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
