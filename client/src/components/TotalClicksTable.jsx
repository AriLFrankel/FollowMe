import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SummaryUser from './SummaryUser.jsx';
import getComment from '../util/getComment.js';

// table to display total number of clicks per user during the presentation
class TotalClicksTable extends Component {
  constructor () {
    super();
    this.state = {
      showUserSummary: null,
      comment: ''
    };
  }

  displayUserSummary (id) {
    // show user's summary
    if (!this.state.showUserSummary || this.state.showUserSummary !== id) {
      this.setState({showUserSummary: id});
      this.upDateComment(id);
    } else {
      // if the selected user was selected again, close user's summary
      this.setState({showUserSummary: null});
    }
  }

  upDateComment (id) {
    getComment(this.props.summary.lecture[0].id, id, (data) => {
      let comment = data[0].comment;
      this.setState({comment: comment});
    });
  }

  render () {
    // pull out the users from the store and filter by audience
    let usersClicks = this.props.summary.users.filter(user => user.role === 'audience');
    return (
      <div>
        <Link to="/">Home</Link>
        <table id="usersClicks">
        <tbody>
          <tr>
            <th>User</th>
            <th>Clicks</th>
          </tr>
          {
            usersClicks.map(user =>
            <tr>
              <td onClick = { () => { this.displayUserSummary(user.user_id); } }>
                <img id='profilePic' src={user.avatar} /><span>{user.name}</span>
              </td>
              <td>{user.no_of_clicks}</td>
            </tr>
            )
          }
        </tbody>
        </table>
        {
          this.state.showUserSummary
          ? <SummaryUser
            userId={this.state.showUserSummary}
            comment = {this.state.comment}
            upDateComment = {this.upDateComment.bind(this)}
          /> : null
        }
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    summary: state.summary
  };
};

export default connect(mapStatetoProps)(TotalClicksTable);
