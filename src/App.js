import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var PropTypes = require('prop-types');

function SelectLanguage(props) {
    var languages = ['All','Javascript','Ruby','Java','CSS','Python'];
    return (
      <ul className='languages'>
        {languages.map((lang) => {
          return (
            <li
              style={lang===props.selectedLanguage ? {color:'#d0021b'}:null} 
              key={lang} 
              onClick={props.onSelect.bind(null,lang)}>
                {lang}
            </li>)
        })}
      </ul>
    )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

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
    return (      
      <SelectLanguage 
        selectedLanguage={this.state.selectedLanguage} 
        onSelect={this.updateLanguage}
      />
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
