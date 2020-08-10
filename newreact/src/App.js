import React, { useState } from 'react';
import Header from './Components/Header'

const App = props => {

  const [personState, setPersonState] = useState({
    persons: [{ name: 'Pedro', age: 24 },
    { name: 'bbbbb', age: 23 },
    { name: 'aaaaa', age: 20 }
    ]
  });


  const switchNameHandler = () => {
    setPersonState({
      persons: [{ name: 'aa', age: 55 },
      { name: 'bbbbb', age: 23 },
      { name: 'aaaaa', age: 20 }
      ]
    });
  }

  const changeName = (event) => {
    setPersonState({
      persons: [{ name: event.target.value, age: 55 },
      { name: 'bbbbb', age: 23 },
      { name: 'aaaaa', age: 20 }
      ]
    })

  }



  return (
    <div>
      <Header name={personState.persons[0].name} age={personState.persons[0].age} />
      <Header name={personState.persons[1].name} age={personState.persons[1].age} />
      <Header name={personState.persons[2].name} age={personState.persons[2].age} write={changeName} />
      <button onClick={switchNameHandler}>Switch Name</button>

    </div >
  );

}

export default App;
