import React, { useState } from 'react';
import Header from './Components/Header'
import './App.css';

const App = props => {

    const [personState, setPersonState] = useState({
        persons: [{ id: 0, name: 'Pedro', age: 24 },
        { id: 1, name: 'bbbbb', age: 23 },
        { id: 2, name: 'aaaaa', age: 20 }

        ],

    });

    const [showState, setShowState] = useState({
        show: false
    });

    const showPersons = () => {
        setShowState({
            show: !showState.show
        })
    }

    /*const switchNameHandler = () => {
        setPersonState({
            persons: [{ name: 'aa', age: 55 },
            { name: 'bbbbb', age: 23 },
            { name: 'aaaaa', age: 20 }
            ]
        });
    }*/

    const changeName = (event, id) => {
        const personIndex = personState.persons.findIndex(p => {
            return p.id == id;
        });

        const person = { ...personState.persons[personIndex] };
        person.name = event.target.value;
        const persons = [...personState.persons];
        persons[personIndex] = person;

        setPersonState({
            persons: persons
        });


    }

    const deletePersonHandler = (index) => {
        let valueRemove = [...personState.persons];
        valueRemove.splice(index, 1);
        setPersonState({
            persons: valueRemove
        });

    }

    let showValues = null;
    if (showState.show) {
        showValues = (<div>
            {personState.persons.map((person, index) => {
                return <Header name={person.name}
                    age={person.age}
                    click={() => deletePersonHandler(index)}
                    key={person.id}
                    changed={(event) => changeName(event, person.id)} />


            })}


            {/*<Header name={personState.persons[0].name}
                age={personState.persons[0].age} />
            <Header name={personState.persons[1].name}
                age={personState.persons[1].age} />
            <Header name={personState.persons[2].name}
                age={personState.persons[2].age}
                write={changeName} />*/}</div>

        );

    }


    return (<div className="App">
        <button onClick={showPersons}> Show person </button>
        {showValues}


    </div >
    );

}

export default App;