import React from 'react';

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setWaitiingForADriver(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line" />
      </h5>

      <div className="flex items-center justify-between">
        <img
          className="h-12"
          src="https://purepng.com/public/uploads/large/purepng.com-honda-carshondacarshonda-manufacturingvehicle-honda-1701527486181k3is7.png"
          alt="Vehicle"
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">
            {props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">{props.ride?.captain.vehicle.plate}</h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          <h1 className='text-lg font-semibold'>OTP - {props.ride?.otp}</h1>
        </div>
      </div>

      <div className="gap-2 flex justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-D</h3>
              <p className="text-sm mt-1 text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-D</h3>
              <p className="text-sm mt-1 text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-bank-card-line"></i>
            <div>
              <h3 className="text-lg font-medium">
              ₹{Math.round(props.ride?.fair)}
              </h3>
              <p className="text-sm mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
