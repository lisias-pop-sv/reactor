import React from 'react';
import ReactDOM from 'react-dom';
import ItemList from '../components/item-list';

export default class DropdownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.props.optionList[Object.keys(this.props.optionList)[0]],
            visible: false
        };
        this.selectOption = this.selectOption.bind(this);
        this.switchVisibility = this.switchVisibility.bind(this);
    }
    selectOption(selectedItem) {
        this.setState({label: selectedItem.target.textContent});
    }
    switchVisibility(event) {
        if (ReactDOM.findDOMNode(this).contains(event.target)) {
            this.setState({visible: !this.state.visible});
        } else {
            this.setState({visible: false});
        }
    }
    componentWillMount() {
        document.addEventListener('click', this.switchVisibility, false);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.switchVisibility, false);
    }
    render(){
        let iconState = this.state.visible ? ' fa-caret-up' : ' fa-caret-down';
        let expanded = this.state.visible ? ' expander' : '';
        return (
            <div className={'dropdown-menu no-select container color-white' + expanded}>
                <label className="dropdown-menu__selected text-label--menu bg-black border-white">
                    {this.state.label}
                </label>
                <i className={'dropdown-menu__icon fa' + iconState}></i>
                <ItemList onClick={this.selectOption}
                    itemList={this.props.optionList}
                    listClassNames={'dropdown-menu__list border-white bg-black expandable is-hidden'}
                    itemClassNames={'list-option'}
                />
            </div>
        );
    }
}

DropdownMenu.defaultProps = {
    optionList: ['DropdownMenu', 'two', 'tree']
};
