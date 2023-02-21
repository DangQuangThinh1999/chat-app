import * as React from "react";
import Tooltip from "@mui/material/Tooltip";

import MessageShow from "./MessageShow";
import { IMessage } from "@/types";
type Props = {
  children: JSX.Element;
  onClick: () => Promise<void>;
  message: IMessage;
};
const index = ({ children, onClick, message }: Props) => {
  return (
    <Tooltip
      PopperProps={{
        sx: {
          "& .MuiTooltip-tooltip": {
            backgroundColor: "#e5ded8",
          },
        },
      }}
      placement="right"
      title={<MessageShow message={message} onClick={onClick} />}
    >
      {children}
    </Tooltip>
  );
};

export default index;
