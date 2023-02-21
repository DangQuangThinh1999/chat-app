import { IMessage } from "@/types";
import { Tooltip } from "@mui/material";
import React, { Children } from "react";
type Props = {
  message: IMessage;
  children: JSX.Element;
};
const index = ({ children, message }: Props) => {
  return <Tooltip title="ok">{children}</Tooltip>;
};

export default index;
