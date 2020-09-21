import React, { useState } from 'react';
import './App.css';
import StatisticsHistorical from './Components/StatisticsHistorical';
import Statistics from './Components/Statistics';
import PlayerList from './Components/PlayerList';
import Chart from "react-google-charts";

const App = (props) => {





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
  //const topPlayers = corsError + 'https://euw1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I' + apiKey;


  const loadDataPlayerList = () => {
    const load = true;
    if (!showStatist.loadList) {
      //top 205 players
      const topPlayers = corsError + 'https://euw1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I' + apiKey;
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", topPlayers, false);
      xmlHttp.send();
      let users;
      users = JSON.parse(xmlHttp.responseText);

      setPlayerListState(users);


    }
    setShowStatistState({
      loadList: load,
      playerSelected: showStatist.playerSelected,
      gameList: !showStatist.gameList,
      showMatch: false,
      match: {}
    });
  }
  const loadPlayerData = (playerName) => {
    console.log(playerName)
    let playerData = corsError + 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + playerName + apiKey;
    //datos usuario
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", playerData, false);
    xmlHttp.send();
    let accountId = JSON.parse(xmlHttp.responseText).accountId;

    //historial usuario
    let matchHistory = corsError + 'https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + accountId + apiKey;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", matchHistory, false); // false for synchronous request
    xmlHttp.send();
    let aMatchHistory = JSON.parse(xmlHttp.responseText);

    setDataload({
      selectedPlayer: aMatchHistory
    });


    setShowStatistState({
      loadList: showStatist.loadList,
      playerSelected: !showStatist.playerSelected,
      gameList: !showStatist.gameList,
      showMatch: showStatist.showMatch,
      match: showStatist.match
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
    showState.playerSelected = true;
    setShowStatistState(
      showState
    );
  }

  return (<div>
    <button onClick={loadDataPlayerList}> Show person </button>
    {showStatist.loadList && !showStatist.playerSelected ?
      playerListState.map((player) => {
        return <PlayerList
          key={player.summonerId}
          player={player}
          //history={match}
          click={() => loadPlayerData(player.summonerName)}
        />
      })
      : null}

    {showStatist.playerSelected && !showStatist.showMatch ?

      dataLoad.selectedPlayer.matches.map((match) => {
        return <StatisticsHistorical
          key={match.gameId}
          history={match
          }
          click={() => showGame(match.gameId)}
        />
      })
      : null}
    {/*
      showStatist.gameList ?
        dataLoad.selectedPlayer.matches.map((match) => {
          return <StatisticsHistorical
            key={match.gameId}
            history={match
            }
            click={() => showGame(match.gameId)}
          />
        })
        : null*/
    }
    {showStatist.showMatch ?
      <div>
        < Statistics game={showStatist.match} />
        <Chart
          width={400}
          height={'300px'}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['date', 'Sales', 'Expenses'],
            ['2013', 1000, 400],
            ['2014', 1170, 460],
            ['2015', 660, 1120],
            ['2016', 1030, 540],
          ]}
          options={{
            title: 'Company Performance',
            hAxis: { title: 'date', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 },
            // For the legend to fit, we make the chart area smaller
            chartArea: { width: '50%', height: '70%' },
            // lineWidth: 25
          }}
        />
      </div>
      : null

    }
  </div>
  );

}

export default App;