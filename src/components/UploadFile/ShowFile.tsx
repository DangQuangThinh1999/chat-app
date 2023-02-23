import { Box, Link } from "@mui/material";
import React from "react";
type Props = {
  children?: string;
  url?: string;
};
const ShowFile = ({ children, url }: Props) => {
  return (
    <Link target="_blank" href={url}>
      {children}
    </Link>
  );
};

export default ShowFile;
