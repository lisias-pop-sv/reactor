var GrepBox = React.createClass({
  componentDidMount: function() {
    this.setState({grabbedCode: this.refs['textArea'].value.split('\n')})
  },
  getInitialState: function () {
    return {
      grabbedCode: [],
      codeResults: [],
    }
  },
  filterCode: function (e) {
    var i, filteredResults = [];
    this.setState({
      grabbedCode: this.refs['textArea'].value != '' ? this.refs['textArea'].value.split('\n') : []
    });
    if (this.refs['searchField'].value != '') {
      // filteredResults = filteredResults.filter(function(item) {
      //   console.log(this.refs['searchField'].value);
      //   return item.search(this.refs['searchField'].value) !== -1;
      // })
      for (i = 0; i < this.state.grabbedCode.length; i++) {
        if (this.state.grabbedCode[i].search(this.refs['searchField'].value) !== -1) {
          filteredResults.push({line: i + 1, code: this.state.grabbedCode[i]});
        }
      }
      this.setState({codeResults: filteredResults});
    } else {
      this.setState({codeResults: []});
    }
  },
  render: function() {
    return (
      <div>
        <input ref="searchField" onChange={this.filterCode}
          className="text-field border-box bg-black border-white color-medium-gold" />
        <div className='clearfix border-light-gold bg-black'>
          <ul className='left bg-dark-blue color-medium-gold'>
            {this.state.grabbedCode.map(function(item, index) {
                return <li key={index + 1}>{index + 1}</li>
              }, this) }
          </ul>
          <textarea onChange={this.filterCode}
            style={{width: 97 + '%', height: this.state.grabbedCode.length * 20 + 'px'}}
            className='left bg-black border-none color-light-blue'
            ref="textArea">
            Test arealsd kajhrkwenr34rjh e jiowedf.
          </textarea>
        </div>
        <div className={this.state.codeResults.length > 0 ? "border-light-blue" : ""}>
          <ul>
            {
              this.state.codeResults.map(function(resultItem, i) {
                return <li key={resultItem.line}>{resultItem.line + '. '}{resultItem.code}</li>
              }, this)
            }
          </ul>
        </div>
      </div>
    )
  }
})

ReactDOM.render(
  <GrepBox />,
  document.getElementById('grep-box')
)
