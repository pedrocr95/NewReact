import React, { useState } from 'react';
import InputComponent from './Components/InputComponent';
import ValidationComponent from './Components/ValidationComponent';
import CharComponent from './Components/CharComponent';

const valueWordValidation = ['long enough', 'too short'];


const App = props => {
  const [wordState, setWordState] = useState({
    word: { id: 0, word: '' }
  });

  const [wordSplitState, setWordSplitState] = useState({
    wordSplit: []
  });

  const [wordLengthState, setWordLengthState] = useState({
    meets: ''
  });

  const changeWord = (event) => {
    const word = event.target.value;
    const meet = word.length > 5 ? valueWordValidation[0] : valueWordValidation[1];

    setWordState({
      word: { id: 0, word: word }
    });
    const wordLetters = [];
    const wordSplit = word.split('');
    wordSplit.map((letter, index) => {
      wordLetters[index] = { letter: letter, id: index }
    });

    setWordSplitState({
      wordSplit: wordLetters
    });

    setWordLengthState({
      meets: meet
    });

    //console.log(wordSplitState);
    //console.log(wordSplitState.wordSplit);
    const a = wordSplitState.wordSplit.map(letter => {
      return (<CharComponent word={letter.word} />)

    });


  }


  const deleteChar = (event, id) => {
    const letterList = [...wordSplitState.wordSplit];
    console.log(id);
    const letterListIndex = wordSplitState.wordSplit.findIndex((letter) => {
      return letter.id == id;

    });

    letterList.splice(letterListIndex, 1);
    setWordSplitState({
      wordSplit: letterList
    });

  }
  const charComponent =
    wordSplitState.wordSplit.map(letter => {
      return (<CharComponent word={letter.letter} key={letter.id} delete={(event) => deleteChar(event, letter.id)} />)
    })

  return (<div>
    <InputComponent changed={changeWord} word={wordState.word.word} />
    <ValidationComponent validation={wordLengthState.meets} />

    {charComponent}


  </div>
  );


}

export default App;
