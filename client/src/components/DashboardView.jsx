import React, { Component } from 'react';
import NewPresButton from './NewPresButton';
import Searchbar from './Searchbar';
import LogoutButton from './LogoutButton';
import UserInfo from './UserInfo';
import JoinPresBox from './JoinPresBox';
import DashMainContent from './DashMainContent';
import { Link } from 'react-router';

// view that every user sees after logging in
class DashboardView extends Component {
  constructor () {
    super();
    this.state = {
      search: ''
    };
  };
  updateSearch (value) {
    this.setState({search: value});
    console.log('dashview', this.state.search);
  };

  render () {
    return (
      <div>
        <LogoutButton/>
        <div>
          <NewPresButton/>
          <Searchbar/>
          <UserInfo/>
        </div>
        <DashMainContent/>
        <JoinPresBox />
      </div>
    );
  };
};

export default DashboardView;
