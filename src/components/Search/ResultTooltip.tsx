import { auth, db } from "@/config/firebase";
import { useSearchContext } from "@/contexts/SearchContext";
import { Conversation } from "@/types";

import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import styled from "styled-components";
import ConversationSelect from "../ConversationSelect";

const StyledAvatar = styled(Avatar)`
  margin: 5px 15px 5px 5px;
`;
const ResultTooltip = ({
  onCreate,
  onClose,
}: {
  onCreate: () => Promise<void>;
  onClose: () => void;
}) => {
 
  const { SearchContextState, dispatchSearchAction } = useSearchContext();

  // console.log(user?.docs);

  return (
    <Paper
      sx={{
        width: "20vw",
        overflowY: "scroll",
        maxHeight: "44.5vh",
        mt: -2,
        ml: "-11px",
        zIndex: "-3",
      }}
      elevation={3}
    >
      {SearchContextState.resultSearch ? (
        <Box
          sx={{
            px: "15px",

            "&:hover": { backgroundColor: "#dee2e6" },
          }}
        >
          <Box onClick={onCreate} sx={{ display: "flex", py: "6px" }}>
            <StyledAvatar>
              {SearchContextState.resultSearch?.charAt(0).toLocaleUpperCase()}
            </StyledAvatar>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              {SearchContextState.resultSearch}
            </Typography>
          </Box>
        </Box>
      ) : (
        SearchContextState.allSearch?.map((item) => (
          <ConversationSelect
            onClose={onClose}
            key={item.id}
            id={item.id}
            conversationUsers={(item.data() as Conversation).users}
          />
        ))
      )}
    </Paper>
  );
};

export default ResultTooltip;
