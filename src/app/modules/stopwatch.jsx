import React from 'react';
// import Time from './clock.jsx';
import ItemList from '../components/item-list.jsx';

export default class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.startingTime = new Date(new Date().getTime() - this.props.offsetStartTime);
        this.running = false;
        this.state = {
            timePassed: this.formatTime(this.props.offsetStartTime),
            laps: []
        };
        this.laps = [];
        this.startTime = this.startTime.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.saveLapTime = this.saveLapTime.bind(this);
        this.stopTime = this.stopTime.bind(this);
        this.clearLaps = this.clearLaps.bind(this);
    }
    startTime() {
        if (this.running === false){
            this.startingTime = new Date(new Date().getTime() - this.props.offsetStartTime);
            this.running = true;
            this.setState({timeUpdater: setInterval(this.updateTime, 10)});
        }
    }
    updateTime() {
        this.setState({timePassed: this.formatTime(new Date() - this.startingTime)});
    }
    formatTime(ct) {
        let msecond = ct.toString().slice(-3);
        let seconds = new Date(ct).getSeconds() < 10 ? '0' + new Date(ct).getSeconds() : new Date(ct).getSeconds();
        let minutes = new Date(ct).getMinutes();
        let hours = new Date(ct + new Date(ct).getTimezoneOffset() * 60000).getHours();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hours = hours < 10 ? '0' + hours : hours;
        return `${hours}:${minutes}:${seconds}.${msecond}`;
    }
    saveLapTime() {
        this.laps.push(this.state.timePassed + ' ');
        this.setState({laps: this.laps});
    }
    stopTime() {
        clearInterval(this.state.timeUpdater);
        this.running = false;
    }
    clearLaps() {
        this.setState({laps: this.laps = []});
        // console.log(this.laps);
    }
    render() {
        // console.log(this.state.laps);
        return (
            <div className={'stopwatch clearfix'}>
                <span >{this.state.timePassed}</span>
                <button onClick={this.startTime}>Start</button>
                <button onClick={this.stopTime}>Stop</button>
                <button onClick={this.saveLapTime} className={'clear-left'}>Lap</button>
                <button onClick={this.clearLaps}>Clear laps</button>
                <div className={'stopwatch__lap-list-container right border-light-gold'}>
                    <ItemList
                        listElement={'ul'} itemElement={'li'}
                        listClassNames={'stopwatch__lap-list'}
                        itemClassNames={'stopwatch__lap-list-item'}
                        itemList={this.state.laps}
                    />
                </div>
            </div>
        );
    }
    componentWillUnmount() {
        clearInterval(this.state.timeUpdater);
    }
}

Stopwatch.defaultProps = {
    offsetStartTime: 0
};
