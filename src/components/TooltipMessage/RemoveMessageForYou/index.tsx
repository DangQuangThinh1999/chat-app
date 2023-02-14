import { Box, IconButton, Tooltip } from "@mui/material";
import * as React from "react";
import ActionRemoveForYou from "./ActionRemoveForYou";

type Props = {
  children: JSX.Element;
  onClick: () => Promise<void>;
};
const index = ({ children, onClick }: Props) => {
  return (
    <Tooltip
      PopperProps={{
        sx: {
          "& .MuiTooltip-tooltip": {
            color: "black",
            position: "absolute",
            left: "140px",
            bottom: "5px",
            backgroundColor: "initial",
          },
        },
      }}
      sx={{ position: "relative" }}
      title={<ActionRemoveForYou onClick={onClick} />}
    >
      {children}
    </Tooltip>
  );
};

export default index;
