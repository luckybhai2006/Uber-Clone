import React from 'react';

const LocationPannel = ({ suggestions, setPickUp, setdestination, activeField }) => {

   const handleSuggestionClick = (suggestion) => {
      const address = suggestion?.description || '';
      if (activeField === 'pickup') {
         setPickUp(address);
      } else if (activeField === 'destination') {
         setdestination(address);
      }
   };

   return (
      <div className="mt-10 max-h-[95%] overflow-y-auto">
         {suggestions.length === 0 ? (
            <div className="flex items-center justify-center text-gray-500 py-9">
               No address found
            </div>
         ) : (
            suggestions.map((elem, idx) => (
               <div
                  key={idx}
                  onClick={() => handleSuggestionClick(elem)}
                  className="flex gap-2 border-2 bg-gray-300 border-gray-200 active:border-black rounded-xl text-gray-500 items-center my-5 justify-start"
               >
                  <div className="bg-[#eee] flex items-center rounded-full relative ml-2">
                     <i className="text-gray-700 ri-map-pin-fill "></i>
                  </div>

                  <h4 className="ml-1 flex-1">{elem.description}</h4> 
               </div>
            ))
         )}
      </div>
   );
};

export default LocationPannel;
