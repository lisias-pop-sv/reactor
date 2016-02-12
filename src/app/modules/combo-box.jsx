import React from 'react';
import ReactDOM from 'react-dom';

export default class ComboBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            matchList: this.props.optionList ? this.props.optionList : []
        };
        this.selectMatch = this.selectMatch.bind(this);
        this.switchVisibility = this.switchVisibility.bind(this);
        this.searcher = this.searcher.bind(this);
    }
    componentWillMount() {
        window.addEventListener('click', this.switchVisibility, false);
    }
    searcher() {
        if (this.props.optionList) {
            let searchText = this.refs['searchField'].value.replace(/\s{2,}/g, ' ');
            this.setState(
                {
                    matchList : this.props.optionList.filter(option => {
                        return option.toLowerCase().search(searchText.toLowerCase()) !== -1;
                    })
                });
        }
        this.setState({visible: true});
    }
    selectMatch(i, event) {
        if (this.props.optionList && this.state.matchList.length > 0) {
            this.refs['searchField'].value = event.target.textContent;
        }
        this.refs['searchField'].focus();
    }
    switchVisibility(event) {
        if (ReactDOM.findDOMNode(this).contains(event.target) &&
            this.refs['showList'] === event.target
        ) {
            this.setState({visible: !this.state.visible});
            this.refs['searchField'].focus();
        } else {
            this.setState({visible: false});
        }
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.switchVisibility, false);
    }
    render() {
        let iconState = this.state.visible ? ' fa-caret-up' : ' fa-caret-down';
        let expanded = this.state.visible ? ' expander' : '';
        return (
            <div className={'dropdown-menu no-select container color-white' + expanded}>
                <input ref="searchField" onChange={this.searcher}
                    className="combo-box__text-field width-full text-field border-box bg-black border-white color-medium-gold" />
                <button ref="showList"
                    className={'combo-box__open btn btn--default border-light-brown bg-dark-brown color-white fa' + iconState}>
                </button>
                <ul className="combo-box__list width-full border-box bg-black border-gold color-white expandable is-hidden">
                {
                    this.state.matchList.length > 0 ?
                    this.state.matchList.map(function(results, i) {
                        return <li className={'list-option'} onClick={this.selectMatch.bind(null, i)} key={results}>{results}</li>;
                    }, this) : <li className={'list-option disabled'} onClick={this.selectMatch}>{'No results'}</li>
                }
                </ul>
            </div>
        );
    }
}
