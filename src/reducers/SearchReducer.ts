import {
  SearchContextState,
  SearchReducerAction,
  SearchReducerActionType,
} from "../types";

export const SearchReducer = (
  state: SearchContextState,
  { type, payload }: SearchReducerAction
): SearchContextState => {
  switch (type) {
    case SearchReducerActionType.setClose:
      return {
        ...state,
        isClose: payload,
      };
    case SearchReducerActionType.setAllSearch:
      return {
        ...state,
        allSearch: payload,
      };
    case SearchReducerActionType.setResultSearch:
      return {
        ...state,
        resultSearch: payload,
      };
    case SearchReducerActionType.setOnchangeSearch:
      return {
        ...state,
        onChangeSearch: payload,
      };
    case SearchReducerActionType.setIdResultSearch:
      return {
        ...state,
        idReSultSearch: payload,
      };
    default:
      return state;
  }
};
