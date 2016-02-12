// /* eslint-disable react/no-did-mount-set-state*/
import React from 'react';
import ItemList from '../components/item-list';

export default class GrepBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grabbedCode: [],
            codeResults: []
        };
    }
    componentDidMount() {
        this.setState({grabbedCode: this.refs['textArea'].value.split('\n')});
    }
    filterCode() {
        let i;
        let filteredResults = [];
        let grabbedCode = this.refs['textArea'].value ? this.refs['textArea'].value.split('\n') : [];
        if (this.refs['searchField'].value) {
            for (i = 0; i < grabbedCode.length; i++) {
                if (grabbedCode[i].search(this.refs['searchField'].value) !== -1) {
                    filteredResults.push(i + 1 + ' ' + grabbedCode[i]);
                }
            }
            this.setState({codeResults: filteredResults});
        } else {
            this.setState({codeResults: []});
        }
    }
    render() {
        return (
            <div>
                <input ref="searchField" onChange={this.filterCode.bind(this)}
                    className="text-field border-box bg-black border-white color-medium-gold" />
                <div className="clearfix border-light-gold bg-black">
                    <ItemList
                        itemList={this.state.grabbedCode.map((item, index) => index + 1)}
                        listClassNames={'left bg-dark-blue color-medium-gold'}
                    />
                    <textarea onChange={this.filterCode.bind(this)}
                        style={{
                            width: 97 + '%',
                            height: this.state.grabbedCode.length * 20 + 'px',
                            minHeight: 40 + 'px'
                        }}
                        className="left bg-black border-none color-light-blue"
                        ref="textArea" defaultValue={this.props.code}>
                    </textarea>
                </div>
                <ItemList
                    itemList={this.state.codeResults}
                    listClassNames={this.state.codeResults.length > 0 ? 'border-light-blue' : 'border-red'}
                    itemClassNames={''}
                />
            </div>
        );
    }
}

GrepBox.defaultProps = {
    code: `Test  k\najhrkwe\nnr34rjh e jiowedf.`
};
