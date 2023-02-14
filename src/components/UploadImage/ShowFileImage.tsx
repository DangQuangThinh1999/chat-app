import { Box } from "@mui/material";
import React from "react";
import Image from "next/image";
const ShowFileImage = ({ value }: { value: string }) => {
  return (
    <Box>
      <Image
        // src="https://firebasestorage.googleapis.com/v0/b/chat-app-37b9f.appspot.com/o/17.jpg?alt=media&token=0acf063c-8e21-4dcc-8740-caea9d36fe36"
        src={value}
        alt="Picture of the author"
        width={300}
        height={300}
      />
    </Box>
  );
};

export default ShowFileImage;
