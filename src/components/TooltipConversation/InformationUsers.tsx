import React, { useState } from "react";
import Image from "next/image";
import { Avatar, Box, IconButton, TextField, Typography } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckIcon from "@mui/icons-material/Check";
import styled from "styled-components";
import { AppUser } from "@/types";
import RecipientAvatar from "../RecipientAvatar";
import CloseIcon from "@mui/icons-material/Close";
import { auth, db } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, query, setDoc, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
type Props = {
  nickName: {
    recipientEmail: string | undefined;
    recipient: AppUser | undefined;
  };
};
const StyledUserAvatar = styled(Avatar)`
  margin: 5px 0px 5px 5px;
`;

const InformationUser = ({ nickName }: Props) => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);
  const [openLogin, setOpenLogin] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const queryGetConversationsForCurrentUser = query(
    collection(db, "conversations"),
    where("users", "array-contains", nickName.recipientEmail)
  );
  const [conversationsSnapshot, __loading, __error] = useCollection(
    queryGetConversationsForCurrentUser
  );

  let nickNameLogin = conversationsSnapshot?.docs[0].data().nickNameLogin;
  let nickNameUser = conversationsSnapshot?.docs[0].data().nickNameUser;
  const [valueUser, setValueUser] = useState(nickNameUser);
  const [valueLogin, setValueLogin] = useState(nickNameLogin);

  const router = useRouter();
  const conversationId = router.query.id as string;
  // ----------------------------------- HANDLER USER-------------------------------
  const handleUpdateNickNameUser = async (value: string) => {
    const getId = doc(db, "conversations", conversationId);
    await setDoc(
      getId,
      {
        nickNameUser: value,
      },
      { merge: true } // just update what is changed
    );
  };
  // ----------------------------------- HANDLER LOGIN-------------------------------
  const handleUpdateNickNameLogin = async (value: string) => {
    const getId = doc(db, "conversations", conversationId);
    await setDoc(
      getId,
      {
        nickNameLogin: value,
      },
      { merge: true } // just update what is changed
    );
  };

  return (
    <Box>
      {/* ---------------------------------------------------LOGIN-------------------------------------- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* image */}
        <Box sx={{ mr: 7 }}>
          <StyledUserAvatar src={loggedInUser?.photoURL || ""} />
        </Box>
        {/* information */}

        {openLogin ? (
          <Box
            sx={{
              width: 350,
              maxWidth: "100%",
              ml: -10,
              position: "relative",
            }}
          >
            <Box sx={{ position: "absolute", right: 3, zIndex: "2", top: 8 }}>
              <IconButton onClick={() => setValueLogin("")}>
                <CloseIcon />
              </IconButton>
            </Box>
            <TextField
              value={valueLogin}
              onChange={(event) => setValueLogin(event.target.value)}
              fullWidth
              id="fullWidth"
            />
          </Box>
        ) : (
          <Box sx={{ ml: -30 }}>
            <Typography>
              {nickNameLogin ? nickNameLogin : "Set NickNames"}
            </Typography>
            <Typography>{loggedInUser?.email}</Typography>
          </Box>
        )}

        {openLogin ? (
          <Box>
            <IconButton
              onClick={() => {
                handleUpdateNickNameLogin(valueLogin);
                setOpenLogin(false);
              }}
            >
              <CheckIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>
          </Box>
        ) : (
          <Box>
            <IconButton
              onClick={() => {
                setOpenLogin(true);
              }}
            >
              <BorderColorIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>
          </Box>
        )}
      </Box>
      {/* -----------------------------------------------USER------------------------------------------------------- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 5,
          alignItems: "center",
        }}
      >
        {/* image */}
        <Box sx={{ mr: 5 }}>
          <RecipientAvatar
            recipient={nickName.recipient}
            recipientEmail={nickName.recipientEmail}
          />
        </Box>
        {/* information */}
        {openUser ? (
          <Box
            sx={{
              width: 350,
              maxWidth: "100%",
              ml: -10,
              position: "relative",
            }}
          >
            <Box sx={{ position: "absolute", right: 3, zIndex: "2", top: 8 }}>
              <IconButton onClick={() => setValueUser("")}>
                <CloseIcon />
              </IconButton>
            </Box>
            <TextField
              value={valueUser}
              onChange={(event) => setValueUser(event.target.value)}
              fullWidth
              id="fullWidth"
            />
          </Box>
        ) : (
          <Box sx={{ ml: -30 }}>
            <Typography>
              {nickNameUser ? nickNameUser : "Set NickNames"}
            </Typography>
            <Typography>{nickName.recipientEmail}</Typography>
          </Box>
        )}

        {openUser ? (
          <Box>
            <IconButton
              onClick={() => {
                handleUpdateNickNameUser(valueUser);
                setOpenUser(false);
              }}
            >
              <CheckIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>
          </Box>
        ) : (
          <Box>
            <IconButton
              onClick={() => {
                setOpenUser(true);
              }}
            >
              <BorderColorIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default InformationUser;
