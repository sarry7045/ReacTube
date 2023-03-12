import React from "react";
import { Zoom } from "react-reveal";
const Modaal = ({ setSearchResults, searchResults }) => {
  return (
    <>
      <Zoom>
        <div>
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
                  {searchResults.map((result , index) => (
                    <li key={index} className="mb-2">
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
                            title="Video Title"
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
        </div>
      </Zoom>
    </>
  );
};

export default Modaal;
