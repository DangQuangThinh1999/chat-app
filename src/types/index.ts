import { Timestamp } from "firebase/firestore";
import { Dispatch } from "react";

export interface Conversation {
  users: string[];
}

export interface AppUser {
  email: string;
  lastSeen: Timestamp;
  photoURL: string;
}

export interface IMessage {
  id: string;
  conversation_id: string;
  text: string;
  sent_at: string;
  user: string;
  un_sent: string;
  isShow: boolean;
  isDeleted: boolean;
  icon: string;
}

export interface ISearchContext {
  SearchContextState: SearchContextState;
  dispatchSearchAction: Dispatch<SearchReducerAction>;
}
export interface SearchContextState {
  isClose: boolean;
  resultSearch: string | null;
  onChangeSearch: any;
  allSearch: any[] | null;
  idReSultSearch: string | null;
}

export enum SearchReducerActionType {
  setClose = "SetClose",
  setAllSearch = "SetAllSearch",
  setOnchangeSearch = "SetOnchangeSearch",
  setResultSearch = "SetResultSearch",
  setIdResultSearch = "setIdResultSearch",
}

export type SearchReducerAction =
  | {
      type: SearchReducerActionType.setClose;
      payload: boolean;
    }
  | {
      type: SearchReducerActionType.setAllSearch;
      payload: any;
    }
  | {
      type: SearchReducerActionType.setOnchangeSearch;
      payload: any;
    }
  | {
      type: SearchReducerActionType.setResultSearch;
      payload: string;
    }
  | {
      type: SearchReducerActionType.setIdResultSearch;
      payload: string;
    };
