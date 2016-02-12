import React from 'react';

export default class ItemList extends React.Component {
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }
    render() {
        let ListElem = this.props.listElement;
        let ItemElem = this.props.itemElement;
        return (
            <ListElem className={this.props.listClassNames}>
                {this.props.itemList.map((listItem, index) => {
                    return (
                        <ItemElem
                            onClick={this.clickHandler}
                            className={this.props.itemClassNames}
                            key={index}>{listItem}
                        </ItemElem>
                    );
                }, this)}
            </ListElem>
        );
    }
    clickHandler(event) {
        this.props.onClick(event);
    }
}

ItemList.defaultProps = {
    listElement: 'ul',
    listClassNames: '',
    itemElement: 'li',
    itemClassNames: '',
    itemList: []
};
