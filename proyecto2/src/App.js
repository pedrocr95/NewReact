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

  const changeWord = (event) => {
    const word = event.target.value;
    setWordState({
      word: { id: 0, word: word }
    });
  }

  const deleteChar = (event, id) => {
    const text = wordState.word.word.split('');
    text.splice(id, 1);

    setWordState({
      word: { id: 0, word: text.join('') }
    });
  }

  const charComponent =
    wordState.word.word.split('').map((letter, id) => {
      return (<CharComponent word={letter} key={id} delete={(event) => deleteChar(event, id)} />)
    });

  return (<div>
    <InputComponent changed={changeWord} word={wordState.word.word} />
    <ValidationComponent validation={wordState.word.word} />
    {charComponent}


  </div>
  );


}

export default App;
