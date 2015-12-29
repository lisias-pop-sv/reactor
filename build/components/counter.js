var Ctr = React.createClass({
  incCount: function() {
    this.setState({
      counter: this.state.counter + 1
    });
  },
  getInitialState: function() {
    return {
      counter: 0
    }
  },
  render: function(){
    return (
      <div className='my-component'>
        <span>Counting: {this.state.counter}</span>
        <button type='button' onClick={this.incCount}>Increment</button>
      </div>
    );
  }
});

ReactDOM.render(
  <Ctr/>, document.getElementById('counter')
);
