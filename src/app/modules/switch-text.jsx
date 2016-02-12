import React from 'react';
export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stat: false,
            ph: '\'n stones',
            tex: props.tex ? props.tex : this.ph
        };
        this.textChange = this.textChange.bind(this);
    }
    textChange() {
        this.setState({stat: !this.state.stat});
    }
    render() {
        return (
            <h4>
            Heasdllo, world!
            <span
                onMouseOver={this.textChange}
                onMouseOut={this.textChange}
                style={{border: 1 + 'px solid red'}}>
                {this.state.stat ? this.state.ph : this.state.tex}
            </span>
            </h4>
        );
    }
}

MyComponent.defaultProps = {
    tex: 'stax'
};
