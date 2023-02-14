import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import SearchContextProvider from "../contexts/SearchContext";
const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <SearchContextProvider>
        <main className="flex">
          <Sidebar />
        </main>
      </SearchContextProvider>
    </div>
  );
};

export default Home;
