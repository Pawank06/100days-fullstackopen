import { useState } from "react";

const Filter = (props) => {
  return (
    <div>
      search for your contact{" "}
      <input type="text" onChange={props.handleSearch} value={props.search} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNumber}>
      <div>
        name: <input onChange={props.onChangeName} value={props.newName} />
      </div>
      <div>
        number: <input onChange={props.onChangeNum} value={props.newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.filteredPersons.map((person, index) => (
        <div key={index}>
          {" "}
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "985432105" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const addNumber = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    console.log("button clicked", event.target);
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
      important: Math.random() < 0.5,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const onChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const onChangeNum = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = () => {
    setSearch(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleSearch={handleSearch} search={search} />

      <h3>Add a new</h3>
      <PersonForm
        addNumber={addNumber}
        onChangeName={onChangeName}
        onChangeNum={onChangeNum}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  );
};

export default App;
