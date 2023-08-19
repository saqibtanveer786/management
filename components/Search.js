import React, { useState } from "react";

import { IconButton, Input, Box, Drawer } from "@mui/material";
import { IconSearch, IconX } from "@tabler/icons-react";
const Search = (array, setArray) => {
  // drawer top
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
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
    </>
  );
};

export default Search;

