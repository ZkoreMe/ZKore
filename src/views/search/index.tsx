// Next, React
import { FC, useEffect, useState } from "react";
import SearchBar from "components/SearchBar";

export const Search: FC = ({}) => {


  return (
    <div className="md:hero mx-auto p-4">
      <SearchBar/>
    </div>
  );
};
