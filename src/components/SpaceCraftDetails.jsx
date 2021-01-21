import React, {useState, useEffect} from 'react';
import axios from 'axios';

function SpaceCraftDetails(){
    const [isLoading, setLoading] = useState(false);
    const [isDataError, setDataError] = useState(false);
    const [isError, setError] = useState(false);
    const [allData, setAllData] = useState([]);
    const [data, setData] = useState([]);
    const [yearValue, setYearValue] = useState(0);
    const [launchSuccess, setLaunchSuccess] = useState(null);
    const [landSuccess, setLandSuccess] = useState(null);
    useEffect(()=>{
        const fetchData = async () => {
            setDataError(false);
            setLoading(true);      
            try {
                const response = await axios('https://api.spacexdata.com/v3/launches?limit=100');      
                setAllData(response.data);
            } catch (error) {
                setDataError(true);
            }
        };
        fetchData();
    },[isDataError]);
    useEffect(()=>{
        var url = 'https://api.spaceXdata.com/v3/launches?limit=100';
        if(launchSuccess !== null)
            url = url+('&launch_success=' + launchSuccess);
        if(landSuccess !== null)
            url = url+('&land_success=' + landSuccess);
        if(yearValue !== 0)
            url = url+('&launch_year=' + yearValue);
        const fetchYearFilterData = async () => {
            setError(false);
            setLoading(true);      
            try {
                const response = await axios(url);      
                setData(response.data);
                console.log(data);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        fetchYearFilterData();
    },[yearValue, launchSuccess, landSuccess]);
    return (!isError ?
        <div className="container">
            <div className="row center-align">
                <div className="filter-area col-md-2 col-sm-12">
                    <div className="left-pane-style">
                        <h5>Filters</h5>
                        <div className="text-center">Launch Year</div>
                        <hr className="hr-m"/>
                        <div className="row year-margin">
                            {!isLoading && allData && 
                                allData.reduce((u,i)=>{return u.includes(i.launch_year)?u:[...u,i.launch_year]},[]).map((d, index) => 
                                <button className={yearValue === d ? "col-sm-6 left-pane-button left-pane-button-color-dark" : "col-sm-6 left-pane-button left-pane-button-color" }
                                        key={index}
                                        onClick={()=>{setYearValue(d)}}
                                        >{d}</button>)
                            }
                        </div>
                        <button className={yearValue === 0 ? "col-sm-6 left-pane-button-clear left-pane-button-color-dark" : "col-sm-6 left-pane-button-clear left-pane-button-color" }
                                    onClick={()=>{setYearValue(0)}}
                                    >All</button>
                        <div className="filter-spacing"></div>
                        <div className="text-center">Successful Launch</div>
                        <hr className="hr-m"/>
                        <div className="row year-margin">
                            <button className={launchSuccess !== null && launchSuccess === true ? "col-sm-6 left-pane-button left-pane-button-color-dark" : "col-sm-6 left-pane-button left-pane-button-color" }
                                id="launch_success_true"
                                onClick={()=>{setLaunchSuccess(true)}}>True</button>
                            <button className={launchSuccess !== null && launchSuccess === false ? "col-sm-6 left-pane-button left-pane-button-color-dark" : "col-sm-6 left-pane-button left-pane-button-color" }
                                id="launch_success_false"
                                onClick={()=>{setLaunchSuccess(false)}}>False</button>
                        </div>
                        <button className={launchSuccess === null ? "col-sm-6 left-pane-button-clear left-pane-button-color-dark" : "col-sm-6 left-pane-button-clear left-pane-button-color" }
                            onClick={()=>{setLaunchSuccess(null)}}
                            >All</button>
                        <div className="filter-spacing"></div>
                        <div className="text-center">Successful Landing</div>
                        <hr className="hr-m"/>
                        <div className="row year-margin">
                            <button className={landSuccess !== null && landSuccess === true ? "col-sm-6 left-pane-button left-pane-button-color-dark" : "col-sm-6 left-pane-button left-pane-button-color" }
                                id="land_success_true"
                                onClick={()=>{setLandSuccess(true)}}>True</button>
                            <button className={landSuccess !== null && landSuccess === false ? "col-sm-6 left-pane-button left-pane-button-color-dark" : "col-sm-6 left-pane-button left-pane-button-color" }
                                id="land_success_false"
                                onClick={()=>{setLandSuccess(false)}}>False</button>
                        </div>
                        <button className={landSuccess === null ? "col-sm-6 left-pane-button-clear left-pane-button-color-dark" : "col-sm-6 left-pane-button-clear left-pane-button-color" }
                            onClick={()=>{setLandSuccess(null)}}
                            >All</button>
                    </div>
                </div>
                <div className="card-padding col-md-9 col-sm-12">
                    {!isLoading && data && data.length === 0 ? <h6><i>No records to display.</i></h6> :
                     !isLoading && data && data.map((d, index) => 
                        <div key={index} className="card-style card card-width">
                            <img className="card-img-top" src={d.links.mission_patch_small} alt="Card cap"/>
                            <div className="card-body">
                                <h6 className="row card-title blue-color"><strong>{d.mission_name + "# " + d.flight_number}</strong></h6>
                                <div className="row"><strong>Mission Ids:</strong></div>
                                <ul className="row"> 
                                    {d.mission_id.length>0 ?
                                    (d.mission_id.map((mission, m_i)=><li className="blue-color" key={m_i}>{mission}</li>))
                                    : <li className="blue-color"><i>No mission ids</i></li>}
                                </ul>
                                <div className="row"><span className="card-text-info"><strong>Launch Year:</strong></span><span className="blue-color">{d.launch_year}</span></div>
                                <div className="row"><span className="card-text-info"><strong>Successful Launch:</strong></span><span className="blue-color">{JSON.stringify(d.launch_success)}</span></div>
                                <div className="row"><span className="card-text-info"><strong>Successful Landing:</strong></span><span className="blue-color">{JSON.stringify(d.rocket.first_stage.cores[0].land_success)}</span></div>
                                {/* <button className="btn btn-primary">Go somewhere</button> */}
                            </div>
                        </div>   
                    )}
                </div>
            </div>
        </div> 
        :
        <h5>Something went wrong</h5>
    );
}

export default SpaceCraftDetails;