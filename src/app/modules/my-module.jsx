import React from 'react';
export default class Module extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            likes: 0
        };
        this.like = this.like.bind(this);
    }
    like() {
        this.setState({
            likes: this.state.likes + 1
        });
        let HelloMessage = () => <div>Hello</div>;
        HelloMessage;
    }
    render() {
        let owner = this.props.owner;
        let task = this.props.task;
        let likes = this.state.likes;
        return (
            <div className="TodoItem">
                <span className="TodoItem-owner">
                    {'Owner: '}
                    <span className="color-medium-gold">{owner}</span>
                </span>
                <span className="TodoItem-task">
                    {' Task: '}
                    <span className="color-medium-gold">{task}.</span>
                </span>
                <span className="TodoItem-likes">
                    {' Likes: '}
                    <span className="color-medium-gold">{likes}</span>
                </span>
                <button type="button" className="TodoItem-like" onClick={this.like}>Like</button>
            </div>);
    }
}
