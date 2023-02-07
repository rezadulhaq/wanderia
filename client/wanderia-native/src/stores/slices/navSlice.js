import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    waypoints: [
        {
            latitude: -6.175392,
            longitude: 106.827153,
        },
        {
            latitude: -6.119633,
            longitude: 106.86145,
        },
        {
            latitude: -6.298055,
            longitude: 106.865515,
        },
    ],
    locationPermission: false,
    startNavigation: false,
    selectedRide: null,
};

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setOrigin: (state, actions) => {
            // console.log("actions.payload", actions.payload);
            state.origin = actions.payload;
        },
        setDestination: (state, actions) => {
            state.destination = actions.payload;
        },
        setTravelTimeInformation: (state, actions) => {
            state.travelTimeInformation = actions.payload;
        },
        setWaypoints: (state, actions) => {
            state.waypoints = actions.payload;
        },
        setLocationPermission: (state, actions) => {
            state.locationPermission = actions.payload;
        },
        setStartNavigation: (state, actions) => {
            state.startNavigation = actions.payload;
        },
        setSelectedRide: (state, actions) => {
            state.selectedRide = actions.payload;
        },
    },
});

export const {
    setOrigin,
    setDestination,
    setTravelTimeInformation,
    setWaypoints,
    setLocationPermission,
    setStartNavigation,
    setSelectedRide,
} = navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
    state.nav.travelTimeInformation;
export const selectWaypoints = (state) => state.nav.waypoints;
export const selectLocationPermission = (state) => state.nav.locationPermission;
export const selectStartNavigation = (state) => state.nav.startNavigation;
export const selectSelectedRide = (state) => state.nav.selectedRide;

export default navSlice.reducer;
