var TickTock = React.createClass({
  mixins: [SetIntervalMixin, ClearIntervalMixin], // Use the mixin
  getInitialState: function() {
    return {
      hovered: false,
      initialInterval: 1000,
      secondInterval: 1000,
      seconds: 0,
      minInt: 100
    };
  },
  componentDidMount: function() {
     sw = this.setInterval(this.tick, this.state.secondInterval); // Call a method on the mixin
  },
  componentWillUpdate: function(prevState) {
    this.clearInterval(this.tick);
    // console.log(this.state.secondInterval);
    // this.setInterval(this.tick, this.state.secondInterval);
  },
  tick: function() {
    // console.log('init: ' + this.state.initialInterval);
    this.setState({seconds: this.state.seconds + 1});
    if (this.state.hovered && this.state.secondInterval > this.state.minInt) {
      this.setState({secondInterval: this.state.secondInterval - 100});
      console.log('tick: hovering: ' + this.state.hovered + ' ' + this.state.secondInterval);
    }
    if (!this.state.hovered && this.state.secondInterval < this.state.initialInterval) {
      this.setState({secondInterval: this.state.secondInterval + 100});
      console.log('tick: hovering: ' + this.state.hovered + ' ' + this.state.secondInterval);
    }
    if (this.state.seconds > 50) {
      // this.setState({seconds: 0});
      this.clearInterval(this.tick);
    }
  },
  timeAcc: function() {
    // console.log('Acc1: changed: ' + this.state.hovered + seconds);
    this.setState({hovered: true});
    // console.log('Acc2: changed: ' + this.state.hovered + seconds);
  },
  timeDec: function() {
    // console.log('Dec1: changed: ' + this.state.hovered);
    this.setState({hovered: false});
    // console.log('Dec2: changed: ' + this.state.hovered);
  },
  render: function() {
    hours = Math.floor(this.state.seconds / 3600);
    minutes = Math.floor(this.state.seconds / 60 % 60) < 10 ?
              '0' + Math.floor(this.state.seconds / 60 % 60) :
              Math.floor(this.state.seconds / 60 % 60);
    seconds = this.state.seconds % 60 < 10 ?
              '0' + this.state.seconds % 60 :
              this.state.seconds % 60;
    return (
      <p>
        This page is being looked at
        for <span className='no-select border-red color-medium-gold'
          onClick={this.tick}
          onMouseOver={this.timeAcc}
          onMouseOut={this.timeDec}
        > {hours + ':' + minutes + ':' + seconds}</span>.
        Click on the time to skip seconds.
      </p>
    );
  }
});

ReactDOM.render(
  <TickTock />,
  document.getElementById('example')
);
