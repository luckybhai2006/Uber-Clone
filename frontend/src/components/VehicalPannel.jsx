import React from 'react';

const VehicalPannel = (props) => {
  const formatCurrency = (value) => {
    if (!value) return null; // Return null instead of JSX
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleVehicleSelection = (type) => {
    console.log('type', type);
    props.setVehicalType(type); // Set the selected vehicle type
  };

  const LoadingAnimation = () => (
    <div className="flex space-x-2 justify-center">
      <span className="sr-only">Loading...</span>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
    </div>
  );

  return (
    <div>
      <h5
        className="p-3 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehicalPanel(false);
        }}
      >
        <i className="text-3xl text-gray-800 ri-arrow-down-wide-line" />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle </h3>

      {/* Car */}
      <div
        onClick={() => {
          props.setConfirmRide(true);
          props.setVehicalPanel(false);
          handleVehicleSelection('car');
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-12"
          src="https://purepng.com/public/uploads/large/purepng.com-honda-carshondacarshonda-manufacturingvehicle-honda-1701527486181k3is7.png"
          alt=""
        />
        <div className="w-1/2 ml-3">
          <h4 className="font-medium text-base">
            UberGo <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 min's away</h5>
          <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-lg">
          {props.fare?.car ? formatCurrency(props.fare?.car) : <LoadingAnimation />}
        </h2>
      </div>

      {/* Auto */}
      <div
        onClick={() => {
          props.setConfirmRide(true);
          props.setVehicalPanel(false);
          handleVehicleSelection('auto');
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="w-1/2 ml-3">
          <h4 className="font-medium text-base">
            Auto <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">5 min's away</h5>
          <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-lg">
          {props.fare?.auto ? formatCurrency(props.fare?.auto) : <LoadingAnimation />}
        </h2>
      </div>

      {/* Moto */}
      <div
        onClick={() => {
          props.setConfirmRide(true);
          props.setVehicalPanel(false);
          handleVehicleSelection('moto');
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-1/2 ml-3">
          <h4 className="font-medium text-base">
            Moto <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 min's away</h5>
          <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-lg">
          {props.fare?.moto ? formatCurrency(props.fare?.moto) : <LoadingAnimation />}
        </h2>
      </div>
    </div>
  );
};

export default VehicalPannel;
