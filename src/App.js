import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import { Button } from 'react-bootstrap';


const apikey = process.env.REACT_APP_APIKEY

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationName: null,
      nhietdo: null,
      description: null,
      icon: null
    }
  }

  componentDidMount() {
    this.getLocation()
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getWeather(post.coords.latitude, post.coords.longitude)
    })
  }

  async getWeather(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b3bf5d0d00dd188060dcd4cbf225a73c&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      locationName: data.name,
      nhietdo: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    });
    console.log("aaaa", data)
  };




  //1. how can i change the city
  //2. how can i get weather by my current location?
  //

  callWeather = async (name) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=b3bf5d0d00dd188060dcd4cbf225a73c&units=metric`
    let response = await fetch(url);
    let data = await response.json()

    console.log("aaa", data)
    this.setState({
      locationName: data.name,
      nhietdo: data.main.temp,
      description: data.weather[0].description,
    })

  }

  search(event) {
    event.preventDefault()
    console.log(document.getElementById("input").value);
    let d = document.getElementById("input").value;

    this.callWeather(d);
  }

  render() {
    if (this.state.locationName == null) {
      return (
        <h1>Loading...</h1>
      )
    }

    return (
      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
          <Button variant="light" onClick={() => this.callWeather("London")}>London</Button>
          <Button variant="light" onClick={() => this.callWeather("Thailand")}>Bangkok</Button>{' '}
          <Button variant="light" onClick={() => this.callWeather("Tokyo")}>Tokyo</Button>{' '}
          <Button variant="light" onClick={() => this.callWeather("Sydney")}>Sydney</Button>{' '}
          <Button variant="light" onClick={() => this.callWeather("Singapore")}>Singapore</Button>{' '}
          <Button variant="light" onClick={() => this.callWeather("Saigon")}>Saigon</Button>{' '}
          <Button variant="light" onClick={() => this.callWeather("seoul")}>Seoul</Button>{' '}
          <Button variant="light" onClick={() => this.callWeather("Hanoi")}>Hanoi</Button>{' '}
          </div>
          <div className="row justify-content-center text-center">

            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather App
                </h1>
            <h2 className="col-12">Location: {this.state.locationName}</h2>
            <h2 className="col-12 text-danger">{this.state.nhietdo}*C</h2>
            <h3 className="col-12">Weather: {this.state.description}</h3>
          </div>
          <div className="finding">
          <form >
              <label>
                City Name:
            <input type="text" name="name" id="input" />
              </label>
              <input type="submit" value="Submit" onClick={this.search.bind(this)} />
            </form>
            </div>
        </div>
      </div>
    )
  }
}

export default App;

