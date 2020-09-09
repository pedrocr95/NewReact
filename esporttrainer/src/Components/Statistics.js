import React from 'react';
import '../App.css';

const Statistics = (props) => {
    const historicalData = props.game
    console.log(historicalData);
    //const match = <div onClick={props.click}>{historicalData.gameId}</div>
    const dataShowBlue = historicalData.participants.map((participant) => {
        console.log(historicalData.participantIdentities[participant.participantId - 1].player.summonerName);
        return participant.teamId == 100 ? <td className="Blue" key={participant.participantId}>{historicalData.participantIdentities[participant.participantId - 1].player.summonerName}</td> : null;

    });
    const dataShowRed = historicalData.participants.map((participant) => {
        return participant.teamId == 200 ? <td className="Red" key={participant.participantId}>{historicalData.participantIdentities[participant.participantId - 1].player.summonerName}</td> : null;

    });
    return (
        <table>
            <tbody>
                <tr>
                    {dataShowBlue}
                </tr>

                <tr>
                    {dataShowRed}
                </tr>
            </tbody>
        </table>
    );


}
/*

championId: 60
participantId: 10
spell1Id: 4
spell2Id: 11
stats: {participantId: 10, win: true, item0: 1414, item1: 3135, item2: 0, …}
teamId: 200
timeline: {participantId: 10, creepsPerMinDeltas: {…}, xpPerMinDeltas: {…}, goldPerMinDeltas: {…}, damageTakenPerMinDeltas: {…}, …}
participantIdentities
*/
export default Statistics;