import { Box, Button, CardMedia, IconButton, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SendIcon from "@mui/icons-material/Send";
import ImageList from "@mui/material/ImageList";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

type Props = {
  data: any[];
  onClear: () => void;
  onUpload: (value: File) => void;
  scrollToBottom: () => void;
};

const ActionImage = ({ data, onClear, onUpload, scrollToBottom }: Props) => {
  const [list, setList] = useState(data);
  const handleDeleteImage = (value: string, list: any[]) => {
    const result = list.filter((item) => item.path !== value);
    setList(result);
  };

  const handleSend = (value: File[]) => {
    value.map((item) => onUpload(item));
    onClear();
    scrollToBottom;
  };
  return (
    <Box>
      {list.length > 0 ? (
        <Box>
          <ImageList
            sx={{
              position: "absolute",
              bottom: 200,
              left: 461,
              width: 400,
              display: "flex",
              overflowX: "auto",
              padding: "10px",
              backgroundColor: "white",
            }}
          >
            {list?.map((file, index) => (
              <>
                <CardMedia
                  key={index}
                  component="img"
                  width={"100px"}
                  height={"100px"}
                  sx={{ objectFit: "cover", border: "2px solid black" }}
                  image={file.url}
                />
                <IconButton
                  onClick={() => handleDeleteImage(file.path, list)}
                  sx={{
                    height: 30,
                    width: 30,
                    ml: "-20px",
                    mt: "-10px",
                    background: "black",
                    color: "white",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </>
            ))}
          </ImageList>

          <Stack
            direction="row"
            spacing={20}
            sx={{
              display: "flex",
              position: "absolute",
              bottom: 124,
              left: 461,
              background: "white",
              padding: "20px",
            }}
          >
            <Button
              onClick={onClear}
              variant="outlined"
              startIcon={<ClearIcon />}
            >
              CLEAR
            </Button>
            <Button
              onClick={() => handleSend(list)}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box sx={{ display: "none" }}></Box>
      )}
    </Box>
  );
};

export default ActionImage;
