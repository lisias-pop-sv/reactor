import React from 'react';

export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
        this.incCount = this.incCount.bind(this);
    }
    incCount() {
        this.setState({counter: this.state.counter + 1});
    }
    render(){
        return (
            <div className="my-component">
            <span>Counting: {this.state.counter}</span>
            <button type="button" onClick={this.incCount}>Increment</button>
            </div>
        );
    }
}
