import { IMessage } from "@/types";
import { Box, Fade, IconButton, Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import * as React from "react";
import TitleMessageRemove from "./TitleMessageRemove";
type Props = {
  children: JSX.Element;

  message: IMessage;
};
const MessageRemove = ({ children, message }: Props) => {
  return (
    <Tooltip
      PopperProps={{
        sx: {
          "& .MuiTooltip-tooltip": {
            backgroundColor: "initial",
          },
        },
      }}
      disableInteractive
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 500 }}
      placement="right"
      title={<TitleMessageRemove message={message} />}
    >
      {children}
    </Tooltip>
  );
};

export default MessageRemove;
