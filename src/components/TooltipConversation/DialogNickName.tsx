import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import InformationUsers from "./InformationUsers";
import { AppUser } from "@/types";
type Props = {
  children: JSX.Element;
  nickName: {
    recipientEmail: string | undefined;
    recipient: AppUser | undefined;
  };
};
const ActionRemoveForYou = ({ children, nickName }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Box onClick={handleClickOpen}>{children}</Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          sx={{
            display: "inline-flex",
            width: "550px",
            position: "relative",
          }}
        >
          <DialogTitle
            sx={{ textAlign: "center", fontWeight: "bold", ml: 25 }}
            id="alert-dialog-title"
          >
            {"NickNames"}
          </DialogTitle>
          <Box sx={{ mr: 0 }}>
            <IconButton
              onClick={handleClose}
              sx={{
                borderRadius: "50%",
                backgroundColor: "#e5e5e5",
                height: "36px",
                width: "36px",
                color: "gray",
                mt: 2,
                position: "absolute",
                right: 25,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <InformationUsers nickName={nickName} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#1B74E4",
              fontSize: "0.8rem",
              borderRadius: "6px",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActionRemoveForYou;
