/*eslint-disable no-console*/
import React from 'react';
import ItemList from '../components/item-list';

export default class GroceryList extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            liked: false
        };
    }
    handleClick(item) {
        console.log('You clicked: ' + item.target.textContent);
    }
    render() {
        return (
            <ItemList
                itemElement={'li'}
                itemClassNames={'color-light-green'}
                itemList={this.props.itemList}
                onClick={this.handleClick}
            />
        );
    }
}
// <div>
// {this.props.itemList.map((item, i) => {
//     return (
//         <span onClick={this.handleClick.bind(this, i)} key={i}> {item}</span>
//     );
// }, this)}
// </div>
GroceryList.defaultProps = {
    itemList: []
};
