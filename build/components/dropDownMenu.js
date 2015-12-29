var DropdownMenu = React.createClass({
  getInitialState: function() {
    return {
      label: this.props.optionList[ Object.keys( this.props.optionList )[0] ],
      visible: false,
    }
  },
  selectOption: function(i) {
    this.setState({label: this.props.optionList[i]});
  },
  switchVisibility: function(event) {
    if (ReactDOM.findDOMNode(this).contains(event.target)) {
      this.setState({visible: !this.state.visible})
    } else {
      this.setState({visible: false})
    }
  },
  componentWillMount: function() {
    document.addEventListener('click', this.switchVisibility, false);
  },
  componentWillUnmount: function() {
    document.removeEventListener('click', this.switchVisibility, false);
  },
  render: function(){
    var iconState = this.state.visible ? " fa-caret-up" : " fa-caret-down",
        expanded = this.state.visible ? " expander" : "";
    return (
      <div className={"dropdown-menu no-select container color-white" + expanded}>
        <label className="dropdown-menu__selected text-label--menu bg-black border-white bg-black">
          {this.state.label}
        </label>
        <i className={"dropdown-menu__icon fa" + iconState}></i>
        <ul className="dropdown-menu__list border-white bg-black expandable is-hidden">
          {
            this.props.optionList.map(function(listItem, i) {
              return (
                <li className="list-option" onClick={this.selectOption.bind(this, i)} key={listItem}>{listItem}</li>
              )
            }, this)
          }
        </ul>
      </div>
    );
  }
});

ReactDOM.render(
    <DropdownMenu optionList={['one', 'two','tree']}/>,
    document.getElementById('dropdown-menu')
);
