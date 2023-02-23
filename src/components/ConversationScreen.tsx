import IconButton from "@mui/material/IconButton";
import styled from "styled-components";
import { useRecipient } from "../hooks/useRecipient";
import { Conversation, IMessage } from "../types";
import {
  convertFirestoreTimestampToString,
  generateQueryGetMessages,
} from "../utils/getMessagesInConversation";
import RecipientAvatar from "./RecipientAvatar";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import ImageIcon from "@mui/icons-material/Image";
import {
  KeyboardEventHandler,
  MouseEventHandler,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import {
  addDoc,
  collection,
  doc,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { Box, ClickAwayListener, Tooltip } from "@mui/material";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { EmojiClickData } from "emoji-picker-react";
import { useSnackbar } from "notistack";
import Image from "next/image";
import MessageConversation from "./MessageConversation";

import EmojiPicker from "emoji-picker-react";
import { Paper } from "@material-ui/core";
import MoreTooltipConversation from "./TooltipConversation";
import DropZone from "./DragDropFile/DropZone";

const StyledRecipientHeader = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  align-items: center;
  padding: 11px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const StyledHeaderInfo = styled.div`
  flex-grow: 1;

  > h3 {
    margin-top: 0;
    margin-bottom: 3px;
  }

  > span {
    font-size: 14px;
    color: gray;
  }
`;

const StyledH3 = styled.h3`
  word-break: break-all;
`;

const StyledHeaderIcons = styled.div`
  display: flex;
`;

const StyledMessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const StyledInputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 15px;
  margin-left: 15px;
  margin-right: 15px;
`;

const EndOfMessagesForAutoScroll = styled.div`
  margin-bottom: 30px;
`;

const ConversationScreen = ({
  conversation,
  messages,
}: {
  conversation: Conversation;
  messages: IMessage[];
}) => {
  const [percent, setPercent] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [newMessage, setNewMessage] = useState("");
  const [loggedInUser, _loading, _error] = useAuthState(auth);
  const conversationUsers = conversation.users;

  const { recipientEmail, recipient } = useRecipient(conversationUsers);

  const router = useRouter();
  const conversationId = router.query.id; // localhost:3000/conversations/:id

  const queryGetMessages = generateQueryGetMessages(conversationId as string);

  const [messagesSnapshot, messagesLoading, __error] =
    useCollection(queryGetMessages);

  const queryGetConversationsForCurrentUser = query(
    collection(db, "conversations"),
    where("users", "array-contains", recipientEmail)
  );
  const [conversationsSnapshot, ,] = useCollection(
    queryGetConversationsForCurrentUser
  );

  let nickNameUser = conversationsSnapshot?.docs[0].data().nickNameUser;
  const addMessageToDbAndUpdateLastSeen = async () => {
    // update last seen in 'users' collection
    await setDoc(
      doc(db, "users", loggedInUser?.email as string),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    ); // just update what is changed

    // add new message to 'messages' collection
    await addDoc(collection(db, "messages"), {
      conversation_id: conversationId,
      sent_at: serverTimestamp(),
      text: newMessage,
      user: loggedInUser?.email,
      isShow: true,
    });

    // reset input field
    setNewMessage("");

    // scroll to bottom
    scrollToBottom();
  };

  const sendMessageOnEnter: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!newMessage) return;
      addMessageToDbAndUpdateLastSeen();
    }
  };

  const sendMessageOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (!newMessage) return;
    addMessageToDbAndUpdateLastSeen();
  };

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollAutoBottom = () => {
    endOfMessagesRef.current?.scrollIntoView();
  };
  //--------------------------Handle Image-------------------------------

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      handleUploadImage(e.target.files[0]);
      e.target.value = "";
      //error
    }
  };
  const handleUploadImage = (value: File) => {
    if (value !== null) {
      // Creating a storage reference

      const storageReference = ref(storage, value?.name);

      // Creating an upload task
      const uploadTask = uploadBytesResumable(storageReference, value);

      // Monitoring upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
          // update progress
          if (percent === 100) {
            enqueueSnackbar("This is a success message Photo!", {
              variant: "success",
            });
          }
        },
        (err) => console.log(err),
        async () => {
          // download url
          let img = await getDownloadURL(uploadTask.snapshot.ref).then(
            (url) => {
              return url;
            }
          );

          await setDoc(
            doc(db, "users", loggedInUser?.email as string),
            {
              lastSeen: serverTimestamp(),
            },
            { merge: true }
          ); // just update what is changed

          // add new message to 'messages' collection
          await addDoc(collection(db, "messages"), {
            conversation_id: conversationId,
            sent_at: serverTimestamp(),
            user: loggedInUser?.email,
            urlImage: img,
            isShow: true,
          });

          // scroll to bottom

          scrollToBottom();
        }
      );
    } // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
  };
  //--------------------------Handle File-------------------------------

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      if (e.target.files[0].type === "video/mp4") {
        handleUploadMedia(e.target.files[0]);
      } else handleUploadFile(e.target.files[0]);
    }
    e.target.value = "";
  };
  const handleUploadFile = (value: File) => {
    if (value !== null) {
      // Creating a storage reference

      const storageReference = ref(storage, value?.name);

      // Creating an upload task
      const uploadTask = uploadBytesResumable(storageReference, value);

      // Monitoring upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          if (percent === 100) {
            enqueueSnackbar("This is a success message File!", {
              variant: "success",
            });
          }
        },
        (err) => console.log(err),
        async () => {
          // download url
          let urlFile = await getDownloadURL(uploadTask.snapshot.ref).then(
            (url) => {
              return url;
            }
          );

          await setDoc(
            doc(db, "users", loggedInUser?.email as string),
            {
              lastSeen: serverTimestamp(),
            },
            { merge: true }
          ); // just update what is changed

          // add new message to 'messages' collection
          await addDoc(collection(db, "messages"), {
            conversation_id: conversationId,
            sent_at: serverTimestamp(),
            text: newMessage,
            user: loggedInUser?.email,
            urlFile: urlFile,
            nameFile: value.name,
            isShow: true,
          });
          setNewMessage("");
          // scroll to bottom

          scrollToBottom();
        }
      );
    } // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
  };
  //--------------------------Handle Media-------------------------------

  const handleUploadMedia = (value: File) => {
    if (value !== null) {
      // Creating a storage reference

      const storageReference = ref(storage, value?.name);

      // Creating an upload task
      const uploadTask = uploadBytesResumable(storageReference, value);

      // Monitoring upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          if (percent === 100) {
            enqueueSnackbar("This is a success message Media!", {
              variant: "success",
            });
          }
        },
        (err) => console.log(err),
        async () => {
          // download url
          let urlMedia = await getDownloadURL(uploadTask.snapshot.ref).then(
            (url) => {
              return url;
            }
          );

          await setDoc(
            doc(db, "users", loggedInUser?.email as string),
            {
              lastSeen: serverTimestamp(),
            },
            { merge: true }
          ); // just update what is changed

          // add new message to 'messages' collection
          await addDoc(collection(db, "messages"), {
            conversation_id: conversationId,
            sent_at: serverTimestamp(),
            user: loggedInUser?.email,
            urlMedia: urlMedia,
            nameMedia: value.name,
            isShow: true,
          });

          // scroll to bottom

          scrollToBottom();
        }
      );
    } // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
  };
  //-------------------------HANDLE EMOJI ----------------
  const onEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
    setNewMessage((prevInput) => prevInput + emojiObject.emoji);
  };

  return (
    <>
      <StyledRecipientHeader>
        <RecipientAvatar
          recipient={recipient}
          recipientEmail={recipientEmail}
        />

        <StyledHeaderInfo>
          <StyledH3>{nickNameUser ? nickNameUser : recipientEmail}</StyledH3>
          {recipient && (
            <span>
              Last active:{" "}
              {convertFirestoreTimestampToString(recipient.lastSeen)}
            </span>
          )}
        </StyledHeaderInfo>

        <StyledHeaderIcons>
          <IconButton
            color="primary"
            aria-label="upload file"
            component="label"
          >
            <AttachFileIcon />
            <input hidden type="file" onChange={handleChangeFile} />
          </IconButton>
          <MoreTooltipConversation nickName={{ recipientEmail, recipient }}>
            <MoreVertIcon />
          </MoreTooltipConversation>
        </StyledHeaderIcons>
      </StyledRecipientHeader>
      {/*----------------------------- DROPZONE--------------------------------- */}
      <DropZone onUpload={handleUploadImage} scrollToBottom={scrollAutoBottom}>
        <Box sx={{ position: "relative" }}>
          <StyledMessageContainer ref={scrollAutoBottom}>
            <MessageConversation
              messagesLoading={messagesLoading}
              messagesSnapshot={messagesSnapshot}
              messages={messages}
            />
            {/* for auto scroll to the end when a new message is sent */}
            <EndOfMessagesForAutoScroll ref={endOfMessagesRef} />
          </StyledMessageContainer>

          {/* Enter new message */}
          <StyledInputContainer>
            <Tooltip title="Emotion">
              <Box sx={{ width: 20, height: 20, position: "relative" }}>
                {showPicker && (
                  <ClickAwayListener
                    onClickAway={() => setShowPicker((val) => !val)}
                  >
                    <Box sx={{ position: "absolute", bottom: 30, left: -10 }}>
                      <Paper elevation={8}>
                        <EmojiPicker
                          height={500}
                          width={400}
                          onEmojiClick={onEmojiClick}
                        />
                      </Paper>
                    </Box>
                  </ClickAwayListener>
                )}
                <Image
                  onClick={() => setShowPicker((val) => !val)}
                  src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                  fill
                  alt="emotion-icon"
                  style={{
                    objectFit: "contain",
                    position: "absolute",
                  }}
                />
              </Box>
            </Tooltip>
            <StyledInput
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              onKeyDown={sendMessageOnEnter}
            />
            <IconButton onClick={sendMessageOnClick} disabled={!newMessage}>
              <Tooltip title="Send">
                <SendIcon />
              </Tooltip>
            </IconButton>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <ImageIcon />
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleChangeImage}
              />
            </IconButton>
            <IconButton>
              <Tooltip title="Microphone">
                <MicIcon />
              </Tooltip>
            </IconButton>
          </StyledInputContainer>
        </Box>
      </DropZone>
    </>
  );
};

export default ConversationScreen;
