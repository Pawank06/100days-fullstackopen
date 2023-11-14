import { useState, useEffect } from "react";
import noteService from "./services/notes";

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
  const handleDelete = (id, name) => {
    // Use window.confirm to get user confirmation
    const confirmDelete = window.confirm(`Delete ${name}?`);

    if (confirmDelete) {
      // Make an HTTP DELETE request to delete the person with the specified id
      noteService
        .delete(id)
        .then(() => {
          // Update the state to reflect the deletion
          const updatedPersons = props.persons.filter(
            (person) => person.id !== id
          );
          props.setPersons(updatedPersons);
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
        });
    }
  };
  return (
    <div>
      {props.filteredPersons.map((person, index) => (
        <div key={index}>
          {" "}
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("effect");

    noteService.getAll().then((initialPerson) => {
      console.log("promise fulfilled");
      setPersons(initialPerson);
    });
  }, []);

  const addNumber = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number?`
      );

      if (!confirmUpdate) {
        return; // User canceled the update
      }
      console.log(existingPerson.id)

      // Make an HTTP PUT request to update the phone number
      noteService
        .update(existingPerson.id, { ...existingPerson, number: newNumber })
        .then((updatedPerson) => {
          
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
          setNewName("");
          setNewNumber("");
        })
    } else {
      console.log("button clicked", event.target);
      const personObject = {
        name: newName,
        number: newNumber,
        important: Math.random() < 0.5,
      };

      noteService.create(personObject).then((returnedPerson) => {
        console.log(returnedPerson);
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const onChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const onChangeNum = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
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
      <Persons
        persons={persons}
        setPersons={setPersons}
        filteredPersons={filteredPersons}
      />
    </div>
  );
};

export default App;
