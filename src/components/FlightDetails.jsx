import React, {useState, useEffect} from 'react';
import axios from 'axios';

function FlightDetails(){
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [data, setData] = useState([]);
    const [yearValue, setYearValue] = useState(0);
    const [isYearClicked, setIsYearClicked] = useState(false);
    useEffect(()=>{const fetchData = async () => {
            setError(false);
            setLoading(true);      
            try {
                const response = await axios('https://api.spacexdata.com/v3/launches?limit=100');      
                setData(response.data);
                console.log(data);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        fetchData();
    },[]);
    return (!isError ?
        <div className="container">
            <div className="row center-align">
                <div className="filter-area col-md-2 col-sm-12">
                    <div className="left-pane-style">
                        <h5>Filters</h5>
                        <div className="text-center">Launch Year</div>
                        <hr className="hr-m"/>
                        <div className="row year-margin">
                            {!isLoading && data && 
                                data.reduce((u,i)=>{return u.includes(i.launch_year)?u:[...u,i.launch_year]},[]).map((d, index) => 
                                <button className="col-sm-6 left-pane-button left-pane-button-color" 
                                        key={index}
                                        onClick={()=>{setYearValue(d)}}
                                        >{d}</button>)
                            }
                        </div>
                            <button className="col-sm-6 left-pane-button-clear left-pane-button-color"
                                        onClick={()=>{setYearValue(0)}}
                                        >Clear All</button>
                        <div className="filter-spacing"></div>
                        <div className="text-center">Successful Launch</div>
                        <hr className="hr-m"/>
                        <div className="row year-margin">
                            <button className="col-sm-6 left-pane-button left-pane-button-color" id="launch_success_true">True</button>
                            <button className="col-sm-6 left-pane-button left-pane-button-color" id="launch_success_false">False</button>
                        </div>
                        <div className="filter-spacing"></div>
                        <div className="text-center">Successful Landing</div>
                        <hr className="hr-m"/>
                        <div className="row year-margin">
                            <button className="col-sm-6 left-pane-button left-pane-button-color" id="land_success_true">True</button>
                            <button className="col-sm-6 left-pane-button left-pane-button-color" id="land_success_false">False</button>
                        </div>
                    </div>
                </div>
                <div className="card-padding col-md-9 col-sm-12">
                    {yearValue === 0 ? !isLoading && data && data.map((d, index) => 
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
                                <div className="row"><span className="card-text-info"><strong>Successful Landing:</strong></span><span className="blue-color">{JSON.stringify(d.land_success)}</span></div>
                                {/* <button className="btn btn-primary">Go somewhere</button> */}
                            </div>
                        </div>   
                    )
                    :
                    !isLoading && data && data.filter(ly => ly.launch_year === yearValue).map((d, index) => 
                        <div key={index} className="card-style card card-width">
                            <img className="card-img-top" src={d.links.mission_patch_small} alt="Card cap"/>
                            <div className="card-body">
                                <h6 className="row card-title"><strong>{d.mission_name + "# " + d.flight_number}</strong></h6>
                                <div className="row"><strong>Mission Ids:</strong></div>
                                <ul className="row"> 
                                    {d.mission_id.length>0 ?
                                    (d.mission_id.map((mission, m_i)=><li key={m_i}>{mission}</li>))
                                    : <li><i>No mission ids</i></li>}
                                </ul>
                                <div className="row"><span className="card-text-info"><strong>Launch Year:</strong></span>{d.launch_year}</div>
                                <div className="row"><span className="card-text-info"><strong>Successful Launch:</strong></span>{JSON.stringify(d.launch_success)}</div>
                                <div className="row"><span className="card-text-info"><strong>Successful Landing:</strong></span>{JSON.stringify(d.land_success)}</div>
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

export default FlightDetails;