import React, { useState, useEffect } from 'react'
import ReactPlayer from "react-player";
import "../App.css";

function VideoModal({ showModal, setShowModal, videoID }) {

    console.log("VideoModal props:", { showModal, setShowModal, videoID });


    return (
        <>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="relative w-11/12 sm:w-8/12 md:w-7/12 lg:w-6/12 xl:w-5/12">
                    
                        <ReactPlayer url={videoID} onError={(e) => console.log(e)} controls={true} playing={true} width="100%" height="100%" />
                        <button className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 cursor-pointer" onClick={() => setShowModal(false)}>X</button>

                    </div>
                </div>
            )}
        </>
    );
}
export default VideoModal;