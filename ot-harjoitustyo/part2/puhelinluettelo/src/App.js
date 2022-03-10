import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Success from './Alarms/success'
import Info from './Alarms/info'
import Warning from './Alarms/warning'
import Error from './Alarms/error'

const App = () => {

  

  const [ persons, setPersons] = useState('') 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState(``)
  const [ filter, setFilter ] = useState('')
  const [ warning, setWarning ] = useState(false)
  const [ success, setSuccess ] = useState(false)
  const [ info, setInfo ] = useState(false)
  const [ error, setError ] = useState(false)
  

  function handleSubmit(e) {
    e.preventDefault();
    let copyOfPersons = [...persons];
    if (copyOfPersons.map(x => x = x.name).includes(newName)) {
      let findPerson = copyOfPersons.filter(x => x.name === newName)[0]
      if (window.confirm(`${newName} is already in the list. Do you want to assign new telephone number?`)) {
        personService
        .update(findPerson.id, { name: newName, number: newNumber, id: findPerson.id })
        .then(updatedPersons => {
          console.log('updatedPerson: ', updatedPersons);
          copyOfPersons[findPerson.id - 1] = updatedPersons;
          setPersons(copyOfPersons)
          setInfo(true);
          setTimeout(() => {
            setInfo(false)
          }, 2000)
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          getPersonData()
          setError(true)
          setTimeout(() => {
            setError(false)
          }, 2000)
        })
      }
      
    } else if (!copyOfPersons.map(x => x = x.name).includes(newName)) {
      let newObj = { name: newName, number: newNumber };
      personService
        .create(newObj)
        .then(newPersons => {
          setPersons(copyOfPersons.concat(newPersons))
      })
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 2000)
    }
  }


  function getPersonData() {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
    })
  }


  function deletePerson(pointer) {
    let obj = persons.filter(x => x.id === pointer)[0];
    if (window.confirm(`Delete ${obj.name}`)) {
      personService
        .delPerson(pointer)
        .then(() => getPersonData())

      setWarning(true);
      setTimeout(() => {
        setWarning(false)
      }, 2000)
    }
  }

  useEffect(() => {
    getPersonData()
  }, [])


  function filterNames() {
    let copyOfPersons = [...persons];
    let newList = copyOfPersons.filter(x => x = x.name.toUpperCase().includes(filter.toUpperCase()));
    return newList;
  }

  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  return (
    <div className='container my-3'>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      {success 
        ? <Success success={success} setSuccess={setSuccess} />
        : warning 
        ? <Warning warning={warning} setWarning={setWarning} />
        : info
        ? <Info info={info} setInfo={setInfo} />
        : error
        ? <Error error={error} setError={setError} />
        : ""
      }
      <h2 className='my-3'>Add new</h2>
      <PersonForm 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Numbers filterNames={filterNames()} deletePerson={deletePerson}/>
    </div>
  )

}

const Filter = (props) => (
  <form>
    <div>
        <label htmlFor='filter' className='my-3 sr-only'></label>
        <input
          type='text'
          name='filter'
          placeholder='filter names'
          onChange={props.handleFilterChange}
          value={props.filter}
          />
    </div>
  </form>
)

const PersonForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div className='my-3'>
      <label htmlFor='text' className='sr-only'></label>
      <input 
        type='text'
        name='text'
        placeholder='name'
        onChange={props.handleNameChange}
        value={props.newName}
        required/>
    </div>
    <div className='my-2'>
      <label htmlFor='tel' className='sr-only'></label>
      <input 
        type='tel'
        name='tel'
        placeholder='telephone number'
        onChange={props.handleNumberChange}
        value={props.newNumber}
        required/>
    </div>
    <div>
      <button type="submit" className='btn btn-primary m-2'>add</button>
    </div>
  </form>
)

const Numbers = (props) => (
  <table className='table table-striped'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Name</th>
          <th scope='col'>Number</th>
          <th scope='col'>Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.filterNames.map(x =>
          <tr key={x.id}>
            <th scope='row'>{x.id}</th>
            <td>{x.name}</td>
            <td>{x.number}</td>
            <td>
              <button className='btn btn-outline-danger' onClick={() => props.deletePerson(x.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
              </td>
          </tr> 
        )}
      </tbody>
  </table>
)




export default App;
