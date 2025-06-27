import React, { useRef, useState } from "react";
import debounce from "lodash/debounce";
import { searchApi } from "./lib/utils";
import { COUNTRIES } from "./lib/countries";

const App: React.FC = () => {
  const [countries, setCountries] = useState<string[]>(COUNTRIES);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [numSearches, setNumSearches] = useState(0);

  const debouncedSearchApi = useRef(
    debounce(async (searchTerm: string) => {
      setNumSearches((prevNumSearches) => prevNumSearches + 1);
      const matchingCountries = await searchApi(searchTerm);
      setCountries(matchingCountries);
    }, 400)
  ).current;

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);

    debouncedSearchApi(newSearchQuery);
  }

  return (
    <main className="p-4 max-w-xl">
      <p className="bg-red-300 p-3  mb-4">
        Open your DevTools, search for a country by typing quickly and verify
        that the simulated API calls are debounced. See this{" "}
        <a
          href="https://sajadtorkamani.com/debounce-api-calls-in-react-using-lodash/"
          className="underline text-blue-600"
          target="_blank"
        >
          post
        </a>{" "}
        for an explanation of this code.
      </p>

      <div className="flex items-center gap-2 mb-5">
        <input
          type="text"
          value={searchQuery}
          placeholder="Search countries..."
          className="border border-gray-400 p-1"
          onChange={handleSearch}
        />

        <div className="text-gray-400 text-sm">
          {" "}
          Num searches: {numSearches}
        </div>
      </div>

      {countries.map((country) => {
        return <div key={country}>{country}</div>;
      })}
    </main>
  );
};

export default App;
