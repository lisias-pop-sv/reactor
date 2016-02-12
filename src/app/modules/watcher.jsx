import React from 'react';

export default class TickTock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            minInt: 100,
            initialInterval: 1000,
            flowing: true,
            secondInterval: 1000,
            seconds: 0
        };
        this.flow = this.flow.bind(this);
        this.tick = this.tick.bind(this);
        this.timeAcc = this.timeAcc.bind(this);
        this.timeDec = this.timeDec.bind(this);
    }
    componentDidMount() {
        this.setState({int: setInterval(this.tick, this.state.secondInterval)});
    }
    flow() {
        if (this.state.flowing) {
            clearInterval(this.state.int);
        } else {
            this.setState({int: setInterval(this.tick, this.state.secondInterval)});
        }
        this.setState({flowing: !this.state.flowing});
    }
    tick() {
        this.setState({seconds: this.state.seconds + 1});
        if (this.state.hovered && this.state.secondInterval > this.state.minInt) {
            this.setState({secondInterval: this.state.secondInterval - 100});
            // console.log('tick: acc: ' + this.state.hovered + ' ' + this.state.secondInterval);
            clearInterval(this.state.int);
            this.setState({int: setInterval(this.tick, this.state.secondInterval)});
        }
        if (!this.state.hovered && this.state.secondInterval < this.state.initialInterval) {
            this.setState({secondInterval: this.state.secondInterval + 100});
            // console.log('tick: decc: ' + this.state.hovered + ' ' + this.state.secondInterval);
            clearInterval(this.state.int);
            this.setState({int: setInterval(this.tick, this.state.secondInterval)});
        }
    }
    timeAcc() {
        this.setState({hovered: true});
    }
    timeDec() {
        this.setState({hovered: false});
    }
    render() {
        let hours = Math.floor(this.state.seconds / 3600);
        let minutes = Math.floor(this.state.seconds / 60 % 60) < 10 ?
                '0' + Math.floor(this.state.seconds / 60 % 60) :
                Math.floor(this.state.seconds / 60 % 60);
        let seconds = this.state.seconds % 60 < 10 ?
                '0' + this.state.seconds % 60 :
                this.state.seconds % 60;
        return (
            <p>
                This page is being looked at
                for <span className="no-select border-red color-light-green"
                    onClick={this.flow} onMouseOver={this.timeAcc} onMouseOut={this.timeDec}
                > {hours + ':' + minutes + ':' + seconds}</span>.
                Hover the clock to accelerate time. Click on it to resume or stop time.
            </p>
        );
    }
    componentWillUnmount() {
        clearInterval(this.tick);
    }
}
