import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';

import LaobanInfo from '../laoban-info/laoban-info';
import DashenInfo from '../dashen-info/dashen-info';
import {getRedirectTo} from "../../utils";

class Main extends Component {
    componentDidMount() {
        const userid = Cookies.get('userid');
        const {_id} = this.props.user;
        if (userid && !_id) {
            console.log(1);
        }
    }

    render() {
        //读取cookie中的userid，检查用户是否登录
        const userid = Cookies.get('userid');
        if (!userid) {
            return <Redirect to='/login'/>
        }

        const {user} = this.props;
        if (!user._id) {
            return null;
        } else {
            let path = this.props.location.pathname;
            if (path === '/') {
                path = getRedirectTo(user.type, user.header);
                return <Redirect to={path}/>
            }
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