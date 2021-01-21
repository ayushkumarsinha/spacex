//import React from 'react';

const serverData = (function (){
    async function getRequest(){
        const data = await(await(fetch('https://api.spacexdata.com/v3/launches?limit=100')
            .then(response => {return response.json();})
            .catch(()=>{})
        ));
        return data;    
    }

    return {
        flightData: function(){
            return getRequest();
        }
    }
}());

export { serverData };