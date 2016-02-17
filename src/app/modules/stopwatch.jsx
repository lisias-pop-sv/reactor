import React from 'react';
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
    componentDidMount() {
        this.secRotationDeg = this.formatTime(new Date() - this.startingTime);
        this.minRotationDeg = this.formatTime(new Date() - this.startingTime);
    }
    startTime() {
        if (this.running === false){
            this.startingTime = new Date(new Date().getTime() - this.props.offsetStartTime);
            this.running = true;
            this.setState({timeUpdater: setInterval(this.updateTime, 30)});
        }
    }
    updateTime() {
        this.setState({timePassed: this.formatTime(new Date() - this.startingTime)});
    }
    formatTime(currTime) {
        let msecond = (new Date(currTime).getMilliseconds() / 1000).toFixed(3);
        let seconds = (new Date(currTime).getSeconds() / 100).toFixed(2) ;
        let minutes = (new Date(currTime).getMinutes() / 100).toFixed(2);
        let hours = (new Date(currTime + new Date(currTime).getTimezoneOffset() * 60000).getHours() / 100).toFixed(2);
        this.timeHandsRotation(currTime);
        return hours.toString().slice(-2) + ':' +
            minutes.toString().slice(-2) + ':' +
            seconds.toString().slice(-2) + '.' +
            msecond.toString().slice(-2);
    }
    timeHandsRotation(time) {
        this.minRotationDeg = 'rotate(' + time / 10000 + 'deg)';
        this.secRotationDeg = 'rotate(' + time / (500 / 3) + 'deg)';
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
    }
    render() {
        return (
            <div className={'stopwatch clearfix'}>
                <span >{this.state.timePassed}</span>
                <button className={'btn btn--default bg-black'} onClick={this.startTime}>
                    Start
                </button>
                <button className={'btn btn--default bg-black'} onClick={this.stopTime}>
                    Stop
                </button>
                <button className={'btn btn--default bg-black'} onClick={this.saveLapTime}>
                    Save lap
                </button>
                <button className={'btn btn--default bg-black'} onClick={this.clearLaps}>
                    Clear laps
                </button>
                <div className={'stopwatch__lap-list-container right border-light-gold'}>
                    <ItemList
                        listElement={'ul'} itemElement={'li'}
                        listClassNames={'stopwatch__lap-list'}
                        itemClassNames={'stopwatch__lap-list-item'}
                        itemList={this.state.laps}
                    />
                </div>
                <div className="stopwatch__visual-time">
                    <div className="stopwatch__needle stopwatch__needle--min"
                        style={{transform: this.minRotationDeg}}>
                    </div>
                    <div className="stopwatch__needle stopwatch__needle--sec"
                        style={{transform: this.secRotationDeg}}>
                    </div>
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
