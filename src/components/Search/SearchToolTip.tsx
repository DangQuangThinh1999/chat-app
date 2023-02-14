import * as React from "react";
import { Box, TextField, Tooltip } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ResultTooltip from "./ResultTooltip";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { SearchContext, useSearchContext } from "@/contexts/SearchContext";
import { Conversation, SearchReducerActionType } from "@/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import * as EmailValidator from "email-validator";
import { useRouter } from "next/router";
import useDebounce from "@/hooks/useDebounce";
import { GetServerSideProps } from "next";

const useStyles = makeStyles(() =>
  createStyles({
    tooltip: {
      background: "none",
      minWidth: "300px",
    },
  })
);

interface Props {
  conversation: Conversation;
}

export default function SearchToolTip() {
  const classes = useStyles();
  const [loggedInUser, _loading, _error] = useAuthState(auth);
  const [changValue, setChangValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const { SearchContextState, dispatchSearchAction } = useSearchContext();
  const router = useRouter();
  const debouncedSearchTerm = useDebounce(changValue, 500);
  const handleTooltipClose = () => {
    setChangValue("");
    setIsOpen(false);
  };
  // getData
  const queryGetConversationsForCurrentUser = query(
    collection(db, "conversations"),
    where("users", "array-contains", loggedInUser?.email)
  );
  // collection all users with userLogin
  const [conversationsSnapshot, __loading, __error] = useCollection(
    queryGetConversationsForCurrentUser
  );
  // Search one in all users
  const isConversationAlreadyExists = (value: string) =>
    conversationsSnapshot?.docs.find((conversation) => {
      return (conversation.data() as Conversation).users.includes(value);
    });
  //done Search all users
  const listUsersSearch = (value: string) =>
    conversationsSnapshot?.docs.filter((conversation) => {
      return (
        (conversation.data() as Conversation).users.filter((user) =>
          user.includes(value)
        ).length > 0
      );
    });

  const handleOnChange = (value: string) => {
    setIsOpen(true);
    setChangValue(value);
    const isInvitingSelf = value === loggedInUser?.email;
    let data = listUsersSearch(value);
    if (data && !EmailValidator.validate(value))
      dispatchSearchAction({
        type: SearchReducerActionType.setAllSearch,
        payload: data,
      });
    else if (
      EmailValidator.validate(value) &&
      !isInvitingSelf &&
      !isConversationAlreadyExists(value)
    ) {
      dispatchSearchAction({
        type: SearchReducerActionType.setResultSearch,
        payload: value,
      });
    } else if (!EmailValidator.validate(value) && !data) {
      dispatchSearchAction({
        type: SearchReducerActionType.setResultSearch,
        payload: "",
      });
    }
  };
  React.useEffect(() => {
    handleOnChange(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const createConversation = async () => {
    // changValue is value == ResultSearch, check changValue not already exists
    if (!isConversationAlreadyExists(changValue)) {
      await addDoc(collection(db, "conversations"), {
        users: [loggedInUser?.email, changValue],
      });
      dispatchSearchAction({
        type: SearchReducerActionType.setAllSearch,
        payload: listUsersSearch(""),
      });

      routerId();
      handleTooltipClose();
    }
  };

  const routerId = async () => {
    const queryGetConversationsId = query(
      collection(db, "conversations"),
      where("users", "array-contains", changValue)
    );
    const docSnap = await getDocs(queryGetConversationsId);
    let id = docSnap.docs.map((doc) => {
      // doc.data() is never undefined for query doc snapshots
      return doc.id;
    });
    router.push(`/conversations/${id[0]}`);
  };
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Box>
        <Tooltip
          classes={{
            tooltip: classes.tooltip,
          }}
          sx={{ position: "" }}
          onClose={handleTooltipClose}
          open={isOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            <ResultTooltip
              onClose={handleTooltipClose}
              onCreate={createConversation}
            />
          }
        >
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PersonSearchIcon />
            </Box>
            <TextField
              sx={{
                ".MuiFilledInput-input": {
                  color: "white",
                },
              }}
              hiddenLabel
              fullWidth
              id="filled-hidden-label-normal"
              variant="filled"
              value={changValue}
              onClick={() => {
                setIsOpen(true);
                dispatchSearchAction({
                  type: SearchReducerActionType.setAllSearch,
                  payload: listUsersSearch(""),
                });
              }}
              onChange={(e) => setChangValue(e.target.value)}
            />
          </Box>
        </Tooltip>
      </Box>
    </ClickAwayListener>
  );
}
