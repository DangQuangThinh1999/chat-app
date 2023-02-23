import { Box, Typography } from "@mui/material";

import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import ActionImage from "./ActionImage";

type Props = {
  children: JSX.Element;
  onUpload: (value: File) => void;
  scrollToBottom: () => void;
};
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  outline: "none",
  border: "none",
  transition: "border .24s ease-in-out",
  zIndex: 20,
  width: "100%",
  height: "100%",
};

const acceptStyle = {
  display: "hidden",
};

const DropZone = ({ children, onUpload, scrollToBottom }: Props) => {
  const [selectedImages, setSelectedImages] = useState<Object[]>([]);

  const onDrop = useCallback((value: Object[]) => {
    // Do something with the files
    setSelectedImages(
      value.map((file: any) =>
        Object.assign(file, { url: URL.createObjectURL(file) })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
    noClick: true,
    accept: { "image/*": [] },
  });
  const style: Object = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragAccept ? acceptStyle : {}),
    }),
    [isDragAccept]
  );

  const handleClear = () => {
    setSelectedImages([]);
  };
  let styleDropZone = isDragAccept ? "flex" : "none";
  let styleChildren = isDragAccept ? "hidden" : "visible";
  return (
    <Box>
      <Box {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <Box
          sx={{
            width: "99%",
            height: "89vh",
            borderColor: "#00e676",
            borderWidth: 2,
            borderRadius: 2,
            backgroundColor: "gray",
            borderStyle: "dashed",
            textAlign: "center",
            display: styleDropZone,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">Drops File Here</Typography>
        </Box>
        <Box sx={{ width: "100%", visibility: styleChildren }}>
          {children}{" "}
          {selectedImages.length > 0 ? (
            <ActionImage
              scrollToBottom={scrollToBottom}
              onUpload={onUpload}
              onClear={handleClear}
              data={selectedImages}
            ></ActionImage>
          ) : (
            <Box sx={{ display: "none" }}></Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DropZone;
