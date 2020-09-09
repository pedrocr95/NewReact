import React from 'react';


const StatisticsHistorical = (props) => {
    const historicalData = props.history;

    const match = <div onClick={props.click}>{historicalData.gameId}</div>

    return (match);


}


export default StatisticsHistorical;