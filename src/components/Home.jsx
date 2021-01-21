import React from 'react';
import SpaceCraftDetails from './SpaceCraftDetails.jsx';

function Home(props){
    return (
        <>
            <h1 className="home-heading">SpaceX Launch Programs</h1>
            <SpaceCraftDetails />
        </>
    )
}
export default Home;