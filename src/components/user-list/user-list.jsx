import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {WhiteSpace, WingBlank, Card} from 'antd-mobile';

const {Header, Body} = Card;

export default class UserList extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    };

    render() {
        const {username, header, info, post, company, salary} = this.props.user;
        return (
            <WingBlank>
                <div>
                    <WhiteSpace/>
                    <Card>
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