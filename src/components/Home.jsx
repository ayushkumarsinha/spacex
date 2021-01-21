import React from 'react';
import SpaceCraftDetails from './SpaceCraftDetails.jsx';

function Home(props){
    return (
        <>
            <h1 className="home-heading">SpaceX Launch Programs</h1>
            <SpaceCraftDetails />
            <footer><strong>Developed by: </strong>Ayush</footer>
            <br />
        </>
    )
}
export default Home;