import { Box, IconButton } from "@mui/material";
import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import { IncomingMessage } from "http";
import IconsMessage from "./IconsMessage";
import { IMessage } from "@/types";
const TitleMessage = ({
  onClick,
  message,
}: {
  onClick: () => Promise<void>;
  message: IMessage;
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <IconsMessage message={message}>
        <SentimentSatisfiedAltIcon />
      </IconsMessage>

      <IconButton>
        <ReplyIcon />
      </IconButton>
      <IconButton onClick={onClick}>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
};

export default TitleMessage;
