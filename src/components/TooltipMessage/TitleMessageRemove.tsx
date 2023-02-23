import { IMessage } from "@/types";
import { Box } from "@mui/material";
import * as React from "react";
type Props = {
  message: IMessage;
};
const TitleMessageRemove = ({ message }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        width: "fit-content",
        padding: "10px",
        color: "white",
        borderRadius: "5px",
      }}
    >
      <Box sx={{ mb: 0.5 }}>Sent: {message.sent_at}</Box>
      <Box>UnSent: {message.unSent}</Box>
    </Box>
  );
};

export default TitleMessageRemove;
