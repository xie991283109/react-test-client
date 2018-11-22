import React, {Component} from 'react';

import './logo.less'
import logo from './logo.png';

export default class Logo extends Component {
    render() {
        return (
            <div className="logo-container">
                <img src={logo} className='logo-img'/>
            </div>
        );
    }
}