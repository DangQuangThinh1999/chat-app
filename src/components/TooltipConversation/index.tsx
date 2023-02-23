import { INickName } from "@/types";
import { Box, ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import React from "react";
import ActionMoreConversation from "./ActionMoreConversation";
type Props = {
  children: JSX.Element;
  nickName: INickName;
};
const MoreTooltipConversation = ({ children, nickName }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Box>
        <Tooltip
          PopperProps={{
            sx: {
              "& .MuiTooltip-tooltip": {
                backgroundColor: "initial",
              },
            },
          }}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={<ActionMoreConversation nickName={nickName} />}
        >
          <IconButton onClick={handleTooltipOpen}>{children}</IconButton>
        </Tooltip>
      </Box>
    </ClickAwayListener>
  );
};

export default MoreTooltipConversation;
