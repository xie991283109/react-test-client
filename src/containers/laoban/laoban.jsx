import React, {Component} from 'react';
import {connect} from 'react-redux';

import UserList from '../../components/user-list/user-list';

import {getUserList} from "../../redux/action";

class Laoban extends Component {
    componentDidMount() {
        this.props.getUserList('dashen');
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
)(Laoban)