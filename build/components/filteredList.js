var FilteredList = React.createClass({
  clearInput: function(event){
    this.refs['searchField'].value = "";
    this.refs['searchField'].focus();
    this.filterList(event);
  },
  filterList: function(event){
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search( event.target.value.toLowerCase() ) !== -1;
    });
    this.setState({items: updatedList});
  },
  getInitialState: function(){
    return {
      initialItems: [
        "Apples",
        "Broccoli",
        "Chicken",
        "Duck",
        "Eggs",
        "Fish",
        "Granola",
        "Hash Browns"
      ],
      items: []
    }
  },
  componentWillMount: function(){
    this.setState({items: this.state.initialItems})
  },
  render: function(){
    return (
      <div className="filter-list">
        <button onClick={this.clearInput}>X</button>
        <input type="text" placeholder="Search" ref={'searchField'} onChange={this.filterList}/>
        <List itemList={this.state.items}/>
      </div>
    );
  }
});

var List = React.createClass({
  render: function(){
    return (
      <div>
      {
        this.props.itemList.map(function(item) {
    // console.log(item);
          return <span key={item}> {item}</span>
        })
      }
      </div>
    )
  }
});

ReactDOM.render(
  <FilteredList/>,
  document.getElementById('filtered-list')
);
