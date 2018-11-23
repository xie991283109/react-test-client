import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {WhiteSpace, WingBlank, Card} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

const {Header, Body} = Card;

class UserList extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    };

    render() {
        const {_id, username, header, info, post, company, salary} = this.props.user;
        return (
            <WingBlank>
                <div>
                    <WhiteSpace/>
                    <Card onClick={() => this.props.history.push(`/chat/${_id}`)}>
                        <Header
                            thumb={require(`../../assets/images/${header}.png`)}
                            extra={username}
                        />
                        <Body>
                        <div>职位：{post}</div>
                        {company ? <div>公司：{company}</div> : null}
                        {salary ? <div>月薪：{salary}</div> : null}
                        <div>描述：{info}</div>
                        </Body>
                    </Card>
                </div>
            </WingBlank>
        );
    }
}

export default withRouter(UserList)