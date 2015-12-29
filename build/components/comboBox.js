var ComboBox = React.createClass({
  getInitialState: function() {
    return {
      matchList: this.props.optionList ? this.props.optionList : [],
    }
  },
  componentWillMount: function() {
    window.addEventListener('click', this.switchVisibility, false);
  },
  searcher: function() {
    if (this.props.optionList) {
      var searchText = this.refs['searchField'].value.replace(/\s{2,}/g, ' ');
      this.setState({ matchList : this.props.optionList.filter(function(option) {
            return option.toLowerCase().search(searchText.toLowerCase()) !== -1;}),
      });
    }
    this.setState({visible: true});
  },
  selectMatch: function(i, event) {
    if (this.props.optionList && this.state.matchList.length > 0) {
      this.refs['searchField'].value = event.target.textContent;
    }
      this.refs['searchField'].focus();
  },
  switchVisibility: function(event) {
    if (ReactDOM.findDOMNode(this).contains(event.target)
        && this.refs['showList'] === event.target
        // || this.refs['searchField'] === document.activeElement
        // && this.refs['searchField'] !== document.activeElement
       ) {
      this.setState({visible: !this.state.visible});
      this.refs['searchField'].focus();
      return;
    } else {
      this.setState({visible: false})
    }
  },
  componentWillUnmount: function() {
    window.removeEventListener('click', this.switchVisibility, false);
  },
  render: function() {
    var iconState = this.state.visible ? " fa-caret-up" : " fa-caret-down",
        expanded = this.state.visible ? " expander" : "";
    return (
      <div className={"dropdown-menu no-select container color-white" + expanded}>
        <input ref="searchField" onChange={this.searcher}
          className="combo-box__text-field width-full text-field border-box bg-black border-white color-medium-gold" />
        <button ref="showList" className={"combo-box__open btn btn--default border-light-brown bg-dark-brown color-white fa" + iconState}></button>
        <ul className="combo-box__list width-full border-box bg-black border-gold color-white expandable is-hidden">
          {
            this.state.matchList.length > 0 ?
              this.state.matchList.map(function(results, i) {
                return <li className={'list-option'} onClick={this.selectMatch.bind(this, i)} key={results}>{results}</li>
              }, this) : <li className={'list-option disabled'} onClick={this.selectMatch}>{'No results'}</li>
          }
        </ul>
      </div>
    );
  }
});

ReactDOM.render(
  <ComboBox optionList={['All options', 'Open', 'Clo sed','Single', 'Double', 'All']}/>,
  document.getElementById('combo-box')
)
