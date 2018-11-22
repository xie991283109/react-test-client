import React, {Component} from 'react';
import {connect} from 'react-redux';

class Laoban extends Component {
    render() {
        return (
            <div>laoban
            </div>
        );
    }
}

export default connect(
    state => ({}),
    {}
)(Laoban)