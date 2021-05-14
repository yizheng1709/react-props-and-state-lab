import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updatePets = (resp) => {
    this.setState({
      pets: [...pets, resp]
    })
  }

  findPets = () => {
    let currentType
    if (this.state.filters.type !== "all"){
      currentType = this.state.filters.type
      fetch("/api/pets?type="+currentType)
      .then(resp => resp.json())
      .then(resp => this.updatePets(resp))
    } else {
      fetch("/api/pets")
      .then(resp => resp.json())
      .then(resp => this.updatePets(resp))
    }
  }

  findAdoptedPet = (id) => {
    let pet = this.state.pets.find(e => e.id === id)
    pet.isAdopted = true
  }

  updateType = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.findPets} onChangeType={this.updateType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.findAdoptedPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
