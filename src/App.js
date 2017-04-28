import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var PropTypes = require('prop-types');
var api = require('./utils/api.js');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var NavLink = ReactRouter.NavLink;
var Switch = ReactRouter.Switch;
var Home = require('./Home.js');
var Battle = require('./Battle.js');


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

function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map((repo, index) => {
        return (
          <li key={repo.name} className="popular-item">
            <div className='popular-rank'>{index + 1} </div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

class Popular extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepo(lang).then(function(repos) {
      console.log(repos);
      this.setState(function() {
        return {
          repos: repos
        }
      })}.bind(this));
  }

  render() {
    return (    
      <div>  
      <SelectLanguage 
        selectedLanguage={this.state.selectedLanguage} 
        onSelect={this.updateLanguage}
      />
      {this.state.repos === null ? 
      <p>Loading</p> :
      <RepoGrid repos={this.state.repos}/>}      
      </div>
    )
  }
}

function Nav() {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>Home </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/battle'>Battle </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/popular'>Popular </NavLink>
      </li>
    </ul>
  )
}

class App extends Component {
  render() {
    return (
      <Router>
      <div className='container'>
        <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/battle' component={Battle} />
          <Route path='/popular' component={Popular} />
          <Route render={function(){
            return <p>Not Found</p>
            }} />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
