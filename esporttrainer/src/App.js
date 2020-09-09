import React, { useState } from 'react';
import './App.css';
import StatisticsHistorical from './Components/StatisticsHistorical';
import Statistics from './Components/Statistics';


const App = props => {
  const [playerListState, setPlayerListState] = useState({
    selectedPlayer: { matches: [] }
  });
  const [dataLoad, setDataload] = useState({
    selectedPlayer: { matches: [] }
  });

  const [showStatist, setShowStatistState] = useState({
    load: false,
    gameList: false,
    playerSelected: false,
    showMatch: false,
    match: {}
  });

  const corsError = 'https://cors-anywhere.herokuapp.com/';
  const apiKey = '?api_key=RGAPI-b21f776d-e1be-498c-af87-60e0ffa0698a';
  const topPlayers = corsError + 'https://euw1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I' + apiKey;


  const loadData = () => {
    const load = true;
    if (!showStatist.load) {
      //top 205 players
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", topPlayers, false);
      xmlHttp.send();
      let users;
      users = JSON.parse(xmlHttp.responseText);

      setPlayerListState(users);





      let playerData = corsError + 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + users[0].summonerName + apiKey;
      //datos usuario
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", playerData, false);
      xmlHttp.send();
      let accountId = JSON.parse(xmlHttp.responseText).accountId

      console.log(playerListState);
      //historial usuario
      let matchHistory = corsError + 'https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + accountId + apiKey;
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", matchHistory, false); // false for synchronous request
      xmlHttp.send();
      let aMatchHistory = JSON.parse(xmlHttp.responseText);

      setDataload({
        selectedPlayer: aMatchHistory
      });
    }
    setShowStatistState({
      load: load,
      gameList: !showStatist.gameList,
      showMatch: false,
      match: {}
    });
  }


  const showGame = (gameId) => {
    const gameSelected = {}
    //Informacion de la partida
    let match = corsError + 'https://euw1.api.riotgames.com/lol/match/v4/matches/' + gameId + apiKey;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", match, false);
    xmlHttp.send();
    /*gameSelected.showMatch = true;
    gameSelected.match = JSON.parse(xmlHttp.responseText);*/
    const showState = { ...showStatist };
    showState.match = JSON.parse(xmlHttp.responseText);
    showState.showMatch = true;
    showState.gameList = !showStatist.gameList;
    setShowStatistState(
      showState
    );
  }

  return (<div>
    <button onClick={loadData}> Show person </button>
    {showStatist.playerSelected ?
      dataLoad.selectedPlayer.matches.map((match) => {
        return <StatisticsHistorical
          key={match.gameId}
          history={match
          }
          click={() => showGame(match.gameId)}
        />
      })
      : null}

    {showStatist.gameList ?
      /*dataLoad.selectedPlayer.matches.map((match) => {
        return <StatisticsHistorical
          key={match.gameId}
          history={match
          }
          click={() => showGame(match.gameId)}
        />
      })*/
      console.log(playerListState)
      : null}
    {showStatist.showMatch ? <Statistics game={showStatist.match} /> : null}
  </div >
  );

}

export default App;