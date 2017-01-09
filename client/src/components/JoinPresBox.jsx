import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import $ from 'jquery';
import { browserHistory } from 'react-router';

// takes a unique id as input and renders AudienceView for specific presentation
class JoinPresBox extends Component {

  componentDidMount () {
    // handles enter key being pressed while join input field is selected
    $('#join').keypress(function (e) {
      if (e.which === 13) {
        $('#joinButton').click();
        return false;
      }
    });
  }

  joinPresentation () {
    // Get lectureId from input box above join button
    let lectureId = $('#join').val();

    // Subscribe to custom namespace based on lectureId
    let socket = io(`/${lectureId}`);

    // Preserve the context of "this"
    let dispatch = this.props.dispatch;
    let userId = this.props.user.id;
    // Listen for presentation URL response from presenter
    socket.on('presentationInfoResponse', function (presentationUrl, presentationName, presentationId) {
      // Update store with presentation data and store socket reference
      dispatch({
        type: 'ASSIGN_LECTURE_ID',
        lectureId: lectureId,
        embedUrl: presentationUrl,
        socket: socket,
        name: presentationName,
        presentationId: presentationId
      });
      let lecture = {
        id: lectureId,
        name: presentationName,
        presentationId: presentationId,
        userId: userId,
        role: 'audience'
      };
      socket.emit('userLecture', lecture);

      // Redirect user to <AudienceView/>
      browserHistory.push('/audience');
    });

    // Emit request to server (and then to presenter) for presention URL
    socket.emit('presentationInfoRequest');
  }

  render () {
    return (
      <div id='joinBox'>
        <input id='join' type='text' /><br/>
        <button id='joinButton' onClick={this.joinPresentation.bind(this)}>Join a presentation</button>
      </div>
    );
  };
};

export default connect(state => state)(JoinPresBox);
