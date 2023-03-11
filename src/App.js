import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [trending, setTrending] = useState([]);


  // get api data on every reload only
  // api = 2d50d4fed70d41aebc7baa7acf8f2a0e
  useEffect(() => {
    axios.get(`https://watchapi.whatever.social/trending?region=IN`)
      .then((res) => {
        console.log(res.data);
        setTrending(res.data); //storing response in trending variable/state
      });

  }, [])


  // video views formating
  function formatNumber(number) {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1000000) {
      return (number / 1000).toFixed(1) + "k";
    } else if (number >= 1000000 && number < 1000000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else {
      return (number / 1000000000).toFixed(1) + "B";
    }
  }


  return (
    <>

      {/* Main Component  */}
      <div className="container mx-auto my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
          {trending.map((val, index) => {
            return (
              <div className="w-full bg-white rounded-lg border-2 border-gray-300 shadow-md" key={val.url}>
                <a href={'https://youtube.com' + val.url} className="h-48 w-full object-cover object-center rounded-t-lg" >
                  <img src={val.thumbnail} alt="img" className="h-48 w-full object-cover object-center rounded-t-lg" />
                </a>
            
                <div className="px-6 py-1">
                  <a href={'https://youtube.com' + val.url} className="font-bold mb-2">{val.title}- #{index+1}</a> 
                  <br />
                  <br />
                                  
                  <div className="flex items-center mb-2">
                    <a href={'https://youtube.com' + val.uploaderUrl}> <img className="w-10 h-10 rounded-full mr-4" src={val.uploaderAvatar} alt="C" />
                      </a> 
                    <div className="text-sm">
                      <a href={'https://youtube.com' + val.uploaderUrl} className="text-gray-900 font-semibold leading-none">{val.uploaderName}</a>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-600 text-sm">{formatNumber(val.views)} </p> &nbsp; &#183; &nbsp;
                        <p className="text-gray-600 text-sm">{val.uploadedDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>




    </>
  )
}

export default App;
