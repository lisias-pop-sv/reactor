import React from 'react';
import ShowItem from './grocery.jsx';

export default class FilteredList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialItems: ['Apples', 'Broccoli', 'Chicken', 'Duck', 'Eggs',
                'Fish', 'Granola', 'Hash Browns'],
            items: []
        };
        this.clearInput = this.clearInput.bind(this);
        this.filterList = this.filterList.bind(this);
    }
    clearInput(event) {
        this.refs['searchField'].value = '';
        this.refs['searchField'].focus();
        this.filterList(event);
    }
    filterList(event){
        let updatedList = this.state.initialItems;
        updatedList = updatedList.filter(item => {
            return item.toLowerCase().search( event.target.value.toLowerCase() ) !== -1;
        });
        this.setState({items: updatedList});
    }
    componentWillMount(){
        this.setState({items: this.state.initialItems});
    }
    render(){
        return (
            <div className="filter-list">
                <button onClick={this.clearInput}>X</button>
                <input type="text" placeholder="Search" ref={'searchField'}
                    onChange={this.filterList}/>
                <ShowItem itemList={this.state.items}/>
            </div>
        );
    }
}

class List extends ShowItem {
    // handleClick(item) {
    //     console.log('You clicked: ' + item);
    // }
    render(){
        return (
            <div>
                {this.props.itemList.map(item => {
                    return <span onClick={this.handleClick.bind(this, item.target)} key={item}> {item}</span>;
                }, this)}
            </div>
        );
    }
}
