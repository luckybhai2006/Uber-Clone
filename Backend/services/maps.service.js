const axios = require('axios');
const captionModel = require('../models/caption.model');

module.exports.getAdressCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        // Log the full response for debugging
        // console.log('Full API Response:', JSON.stringify(response.data, null, 2));

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng,
            };
        } else {
            // console.error(`Error from API: ${response.data.error_message || response.data.status}`);
            throw new Error(response.data.status === 'ZERO_RESULTS'
                ? 'No results found for the given address. Please provide a valid address.'
                : `Unable to fetch coordinates: ${response.data.status}`);
        }
    } catch (error) {
        // console.error('Error fetching coordinates:', error.response?.data || error.message);
        throw error;
    }

};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Both origin and destination are required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0] === "ZERO_RESULTS") {
                throw new Error('No results found for the given address. Please provide a valid address.');
            }
            return response.data.rows[0].elements[0];
        }else{
            throw new Error(`Unable to fetch distance and time: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching distance and time:', error.response?.data || error.message);
        throw error;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Input is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error(`Unable to fetch suggestions: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error.response?.data || error.message);
        throw error;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd,lng,radius) => {

    // radius in km

    const captains = await captionModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    });
    return captains;
}