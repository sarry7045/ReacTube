import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../App.css";
// import Modaal from "./Modaal";

// https://watchapi.whatever.social/search?q=atifaslam&filter=music_songs

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // funtion to fetch search suggestion on realtime user input
  function handleSearchQueryChange(event) {
    try {
      setSearchQuery(event.target.value);
      if (event.target.value.trim() === "") {
        //if input/searching section is empty then set suggestions to empty too.
        setSearchSuggestions([]);
        return;
      }

      // Call API for Search Suggestions
      axios
        .get(
          `https://watchapi.whatever.social/suggestions?query=${event.target.value}`
        )
        .then((res) => {
          console.log(res.data);
          setSearchSuggestions(res.data);
        });
    } catch (error) {
      console.log({ error });
    }
  }

  // function to Fetch Actual search results
  function handleSearchSubmit(event) {
    event.preventDefault();

    try {
      // call API or perform search here
      axios
        .get(
          `https://watchapi.whatever.social/search?q=${searchQuery}&filter=all`
        )
        .then((res) => {
          console.log(res.data.items);

          setSearchResults(res.data.items);
        });
    } catch (error) {
      console.log({ error });
    }
  }

  // clicking on search suggestions will fill the input tag
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchSuggestions([]);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.9 }}
        className="bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="sm:flex hidden">
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipartcraft.com%2Fimages%2Fyoutube-logo-transparent-blue-8.png&f=1&nofb=1&ipt=eae431eda7786f8d40ebc5da39d41a483219ecbe25f98e6a82a342ff21f6afc2&ipo=images"
                  alt="Logo"
                  className="block h-8 w-auto"
                />
                <span className="ml-2 text-white font-bold text-xl">
                  ReacTube
                </span>
              </div>
            </div>

            <div className="relative">
              <form
                onSubmit={handleSearchSubmit}
                className="flex w-full max-w-sm space-x-3"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  placeholder="Search"
                  className="px-4 py-2 w-full text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Search
                </button>
              </form>
              <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-10 top-10">
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>

            {/* Results Modal */}

            {searchResults.length > 0 && (
            <div className="fixed z-50 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl sm:align-middle sm:max-w-lg max-w-3xl">
                  <button
                    className="absolute top-0 right-0 m-4 font-bold text-xl"
                    onClick={() => setSearchResults([])}
                  >
                    X
                  </button>
                  <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                  <ul className="max-h-60vh overflow-y-auto">
                    {searchResults.map((result) => (
                      <li key={result.id} className="mb-2">
                        <div className="flex items-center space-x-4">
                          {result.thumbnail && (
                            <div className="flex-shrink-0 w-3/12">
                              <img
                                src={result.thumbnail}
                                alt="Thumbnail"
                                className="w-full h-auto object-cover rounded"
                              />
                            </div>
                          )}
                          <div className="flex-grow w-9/12">
                                    <a
                                        title="Title"
                              href={"https://youtube.com" + result.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-m font-small text-blue-600 hover:underline"
                            >
                              {result.title}
                            </a>
                          </div>
                        </div>
                        <hr className="my-2 border-gray-300" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
                  )}
            {/* {searchResults?.length > 0 ? (
              <Modaal
                searchResults={searchResults}
                setSearchResults={setSearchResults}
              />
            ) : null} */}
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
