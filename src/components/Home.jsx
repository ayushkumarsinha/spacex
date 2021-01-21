import React from 'react';
// import FlightDetails from './FlightDetails.jsx';
import SpaceCraftDetails from './SpaceCraftDetails.jsx';

function Home(props){
    return (
        <>
            <h1 className="home-heading">SpaceX Launch Programs</h1>
            {/* <FlightDetails />*/}
            <SpaceCraftDetails />
        </>
    )
}
export default Home;