var MyComponent = React.createClass(
  {
    textChange: function() {
      this.setState({stat: !this.state.stat});
    },
    getDefaultProps: function() {
      return {
        tex: 'stax'
      }
    },
    getInitialState: function() {
      return {
        stat: false,
        ph: '\'n stones',
        tex: this.props.tex ? this.props.tex : this.ph
      }
    },
    render: function(){
      return (
        <h4>
          Heasdllo, world!
          <span
            onMouseOver={this.textChange}
            onMouseOut={this.textChange}
            style={{border: 1 + 'px solid red'}}>
            {!this.state.stat ? this.state.tex : this.state.ph}
          </span>
        </h4>
      );
    }
  }
);
ReactDOM.render(
  <MyComponent tex={'sticksx'}/>,
  document.getElementById('text')
);
