import React from 'react';
import '../App.css';


const PlayerList = (props) => {
    //const historicalData = props.history;
    console.log(props.player.summonerName);
    const players = <div onClick={props.click} className="Box">{props.player.summonerName}</div>

    return (players);


}


export default PlayerList;