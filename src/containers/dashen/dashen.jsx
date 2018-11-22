import React, {Component} from 'react';
import {connect} from 'react-redux';

import UserList from '../../components/user-list/user-list';

import {getUserList} from "../../redux/action";

class Dashen extends Component {
    componentDidMount() {
        this.props.getUserList('laoban');
    }

    render() {
        const {userList} = this.props;
        return (
            <div style={{marginBottom: 50, marginTop: 45}}>
                {
                    userList.map((user, index) => <UserList key={index} user={user}/>)
                }

            </div>
        );
    }
}

export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Dashen)