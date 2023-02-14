import { ChangeEvent, useState, useRef } from "react";
import Image from "next/image";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";
import { Box, IconButton } from "@mui/material";

export default function ActionUploadImage() {
  // State to store uploaded file
  const [file, setFile] = useState<File | null>(null); // progress
  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleUploadClick = () => {
    // 👇 We redirect the click event onto the hidden input element
    inputRef.current?.click();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setFile(e.target.files[0]); //error
    }
  };
  const handleUpload = async () => {
    if (file !== null) {
      // Creating a storage reference
      const storageReference = ref(storage, file?.name);

      // Creating an upload task
      const uploadTask = uploadBytesResumable(storageReference, file);

      // Monitoring upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        async () => {
          // download url
          const img = await getDownloadURL(uploadTask.snapshot.ref).then(
            (url) => console.log(url)
          );
        }
      );
    } // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
  };

  return (
    <Box>
      {/* 👇 Our custom button to select and upload a file */}
      <IconButton onClick={handleUploadClick}>OK</IconButton>
      {/* 👇 Notice the `display: hidden` on the input */}
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => handleChange(e)}
        accept="/image/*"
        style={{ display: "none" }}
      />
      <button onClick={handleUpload}>Upload e</button>``
    </Box>
  );
}
