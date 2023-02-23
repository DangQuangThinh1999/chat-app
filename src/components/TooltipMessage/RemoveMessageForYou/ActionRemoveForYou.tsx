import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
type Props = {
  onClick: () => Promise<void>;
};
const ActionRemoveForYou = ({ onClick }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        position: "relative",
        padding: "1",
      }}
    >
      <Tooltip
        placement="top"
        PopperProps={{
          sx: {
            "& .MuiTooltip-tooltip": {
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: "10px 15px",
            },
          },
        }}
        sx={{ position: "absolute", bottom: -20, left: 250 }}
        title="Remove"
      >
        <IconButton onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ display: "inline-flex" }}>
          <DialogTitle
            sx={{ textAlign: "center", fontWeight: "bold", ml: 25 }}
            id="alert-dialog-title"
          >
            {"Remove for you"}
          </DialogTitle>
          <Box>
            <IconButton
              onClick={handleClose}
              sx={{
                borderRadius: "50%",
                backgroundColor: "#e5e5e5",
                height: "36px",
                width: "36px",
                color: "gray",
                mt: 2,
                ml: 19,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This message will be removed for you. Other chat members will still
            be able to see it.
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
          <Button
            sx={{
              backgroundColor: "#1B74E4",
              color: "white",
              fontSize: "0.8rem",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "#1B74E4",
                opacity: 0.9,
              },
            }}
            onClick={() => {
              handleClose();
              onClick();
            }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActionRemoveForYou;
