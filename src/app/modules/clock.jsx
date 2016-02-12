import React from 'react';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: '',
            int: ''
        };
        this.getTime = this.getTime.bind(this);
    }
    componentDidMount() {
        this.setState({timeUpdater: setInterval(this.getTime, this.props.updateInterval)});
    }
    getTime() {
        let hour = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
        let minute = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
        let second = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
        let mili = new Date().getMilliseconds() < 100 ? '0' + new Date().getMilliseconds() : new Date().getMilliseconds();
        this.setState({currentTime: `${hour}:${minute}:${second}.${parseInt(mili / 100)}`});
        // this.setState({int: setInterval(this.tick, 1000)});
        // console.log(new Date().getHours());
        // console.log(this.state.currentTime);
    }
    render() {
        // let time = new Date();
        // console.log(20.123 % 10);
        return (
            <span className={'border-red'}>
                {this.state.currentTime}
            </span>
        );
    }
    componentWillUnmount() {
        clearInterval(this.state.timeUpdater);
    }
}

Clock.defaultProps = {
    updateInterval: 50
};
