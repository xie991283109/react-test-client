import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import LaobanInfo from '../laoban-info/laoban-info';
import DashenInfo from '../dashen-info/dashen-info';

class Main extends Component {
    render() {
        //检查用户是否登录
        const {user} = this.props;
        if (!user._id) {
            return <Redirect to='/login'/>
        }

        return (
            <div>
                <Switch>
                    <Route path='/laobaninfo' component={LaobanInfo}></Route>
                    <Route path='/dasheninfo' component={DashenInfo}></Route>
                </Switch>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user})
)(Main)