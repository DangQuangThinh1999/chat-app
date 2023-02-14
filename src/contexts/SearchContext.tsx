import { createContext, useContext, ReactNode, useReducer } from "react";

import { SearchReducer } from "../reducers/SearchReducer";
import { ISearchContext, SearchContextState } from "../types";

const defaultSearchContextState: SearchContextState = {
  resultSearch: "",
  onChangeSearch: [""],
  isClose: false,
  allSearch: null,
  idReSultSearch: "",
};

export const SearchContext = createContext<ISearchContext>({
  SearchContextState: defaultSearchContextState,
  dispatchSearchAction: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const [SearchContextState, dispatchSearchAction] = useReducer(
    SearchReducer,
    defaultSearchContextState
  );

  const SearchContextProviderData = {
    SearchContextState,
    dispatchSearchAction,
  };

  //-------------------------------------------------------------------------------------

  return (
    <SearchContext.Provider value={SearchContextProviderData}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
