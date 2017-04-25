import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Popular extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    }
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang
      }
    });
  }

  render() {
    var languages = ['All','Javascript','Ruby','Java','CSS','Python'];

    return (
      
      <ul className='languages'>
        {languages.map((lang) => {
          return (
            <li
              style={lang===this.state.selectedLanguage ? {color:'#d0021b'}:null} 
              key={lang} 
              onClick={this.updateLanguage.bind(null,lang)}>
               {lang}
            </li>)
        })}
      </ul>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className='container'>
        <Popular />
      </div>
    );
  }
}

export default App;
