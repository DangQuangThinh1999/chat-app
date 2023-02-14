import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import { Box, Button, ClickAwayListener, IconButton } from "@mui/material";
import Emotion from "./ActionEmotion";
import ActionEmotion from "./ActionEmotion";
import { IMessage } from "@/types";

type Props = {
  children: JSX.Element;

  message: IMessage;
};
const Icon = ({ children, message }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          sx: {
            "& .MuiTooltip-tooltip": {
              backgroundColor: "white",
              position: "absolute",
              bottom: "-10px",
              left: "-150px",
              borderRadius: "25px",
            },
          },
        }}
        placement="top"
        sx={{ position: "relative" }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={<ActionEmotion message={message} />}
      >
        <IconButton onClick={handleTooltipOpen}>{children}</IconButton>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default Icon;
