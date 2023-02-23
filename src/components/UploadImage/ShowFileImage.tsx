import { Box, Button, CardMedia, LinearProgress } from "@mui/material";
import React from "react";

const ShowFileImage = ({ value }: { value: string }) => {
  return (
    <Box>
      <CardMedia
        sx={{ maxHeight: "300px" }}
        component="img"
        height="auto"
        width="auto"
        image={value}
        alt="image"
      />
    </Box>
  );
};

export default ShowFileImage;
