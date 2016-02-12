import React from 'react';

export default class Avatar extends React.Component {
    render() {
        return (
            <div>
            <ProfilePic username={this.props.username} />
            <ProfileLink username={this.props.username} />
            </div>
        );
    }

}

class ProfilePic extends Avatar {
    render() {
        return (
            <img src={'https://graph.facebook.com/' + this.props.username + '/picture'} />
        );
    }
}

class ProfileLink extends Avatar {
    render() {
        return (
            <a href={'https://www.facebook.com/' + this.props.username}>
            {this.props.username}
            </a>
        );
    }
}
