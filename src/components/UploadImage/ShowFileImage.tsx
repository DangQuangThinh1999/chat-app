import { Box, Button } from "@mui/material";
import React from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
const ShowFileImage = ({ value }: { value: string }) => {
  return (
    <Box sx={{ maxWidth: "300px" }}>
      <Image
        // src="https://firebasestorage.googleapis.com/v0/b/chat-app-37b9f.appspot.com/o/17.jpg?alt=media&token=0acf063c-8e21-4dcc-8740-caea9d36fe36"
        src={value}
        alt="Picture of the author"
        fill
      />
    </Box>
  );
};

export default ShowFileImage;
