import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false); // New loading state
    const navigate = useNavigate();

    const submitHander = async (e) => {
        e.preventDefault();
        
        setLoading(true); // Set loading to true when submitting
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
            {
                params: {
                    rideId: props.ride._id.toString(),
                    otp: otp,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (response.status === 200) {
            props.setConfirmRidePopUpPanel(false);
            props.setRidePopUpPanel(false);
            navigate("/captain-riding", { state: { ride: props.ride } });
        }

        setLoading(false); // Reset loading state after the response
    };

    return (
        <div className="flex flex-col h-full relative">
            {/* Full-Screen Blur */}
            {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="animate-spin border-4 border-t-4 border-gray-200 border-t-transparent rounded-full w-16 h-16"></div>
                </div>
            )}

            {/* Content Wrapper */}
            <div className={`flex flex-col h-full ${loading ? "blur-sm" : ""}`}> {/* Apply blur effect when loading */}
                {/* Header */}
                <h5
                    className="p-1 text-center w-[93%] absolute top-0"
                    onClick={() => {
                        props.setRidePopupPanel(false);
                    }}
                >
                    <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
                </h5>
                <h3 className="text-2xl font-semibold mb-5">Confirm this ride to Start</h3>

                {/* Ride Details */}
                <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4">
                    <div className="flex items-center gap-3">
                        <img
                            className="h-12 rounded-full object-cover w-12"
                            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
                            alt=""
                        />
                        <h2 className="text-lg font-medium capitalize">{props.ride?.user.fullname.firstname}</h2>
                    </div>
                    <h5 className="text-lg font-semibold">{props.ride?.distance}</h5>
                </div>

                {/* Additional Details */}
                <div className="flex flex-col gap-2 flex-grow w-full mt-5">
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">Pickup</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">Destination</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3">
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{Math.round(props.ride?.fair)} </h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-auto w-full">
                    <form onSubmit={submitHander}>
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            type="text"
                            className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
                            placeholder="Enter OTP"
                        />
                        <button
                            className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
                        >
                            Confirm
                        </button>
                        <button
                            onClick={() => {
                                props.setConfirmRidePopUpPanel(false);
                                props.setRidePopUpPanel(false);
                            }}
                            className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRidePopUp;
