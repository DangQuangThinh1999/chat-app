import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DialogNickName from "./DialogNickName";
import { AppUser } from "@/types";
type Props = {
  nickName: {
    recipientEmail: string | undefined;
    recipient: AppUser | undefined;
  };
};
const ActionMoreConversation = ({ nickName }: Props) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Paper
        sx={{
          backgroundColor: "white",
          width: "300px",
          height: "300px",
          borderRadius: "2px",
          top: 0.3,
          right: -29,
          position: "absolute",
        }}
        elevation={8}
      >
        <DialogNickName nickName={nickName}>
          <Box
            sx={{
              display: "flex",
              padding: "20px",
              justifyContent: "space-between",
            }}
          >
            <BorderColorIcon sx={{ fontSize: "1.2rem" }} />

            <Typography sx={{ ml: -5, fontWeight: "bold" }}>
              Edit Nicknames
            </Typography>

            <NavigateNextIcon sx={{ color: "gray" }} />
          </Box>
        </DialogNickName>
      </Paper>
    </Box>
  );
};

export default ActionMoreConversation;
