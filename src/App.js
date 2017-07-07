import React, { Component } from 'react';
import './App.css';
import Scroll from './components/Scroll/Scroll';
import Main from './components/Main/Main';
import ApiUtils from './helpers/helpers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      scrollFilm: {},
      currentData: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(request) {
    const apiUtils = new ApiUtils();
    const cachedData = apiUtils.getFromCache(request);
    if (cachedData.length === 0) {
      apiUtils.fetchApiData(request).then((data) => {
        apiUtils.saveToCache(request, data);
        this.setState({ currentData: data });
      });
    } else {
      this.setState({ currentData: cachedData });
    }
  }

  componentDidMount() {
    const apiUtils = new ApiUtils();
    const filmsArray = apiUtils.getFromCache('films');
    if (filmsArray.length === 0) {
      apiUtils.fetchApiData('films').then((films) => {
        apiUtils.saveToCache('films', films);
        this.setState({ scrollFilm: this.getRandomFilm(films) });
      });
    } else {
      this.setState({ scrollFilm: this.getRandomFilm(filmsArray) });
    }
  }

  getRandomFilm(data) {
    return data.results[this.getRandomInt(0, data.results.length)];
  }

  getRandomInt(min, max) {
    const minVal = Math.ceil(min);
    const maxVal = Math.floor(max);
    return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
  }

  render() {
    return (
    <div className='app-container'>
      <Scroll scrollFilm={this.state.scrollFilm} />
      <Main favorites={this.state.favorites}
        currentData={this.state.currentData}
        handleClick={this.handleClick} />
    </div>
    );
  }
}

export default App;
