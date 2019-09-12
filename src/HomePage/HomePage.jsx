import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {userActions} from '../_actions'

import styled from 'styled-components'

const feeds = [
    {
        user: {name: 'William Henry', profpic: 'https://picsum.photos/50'},
        message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        photo: '',
    },
    {
        user: {name: 'Mark Lion', profpic: 'https://picsum.photos/53'},
        message: '',
        photo: 'https://picsum.photos/200',
    },
    {
        user: {name: 'Shina Treu', profpic: 'https://picsum.photos/60'},
        message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        photo: 'https://picsum.photos/500/200',
    },
    {
        user: {name: 'Mill Shon', profpic: 'https://picsum.photos/120'},
        message:
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        photo: 'https://picsum.photos/400/250',
    },
    {
        user: {name: 'Xavi Lon', profpic: 'https://picsum.photos/50'},
        message: '',
        photo: 'https://picsum.photos/300/500',
    },
    {
        user: {name: 'Martin Shorten', profpic: 'https://picsum.photos/53'},
        message: '',
        photo: 'https://picsum.photos/700/200',
    },
]

const HomeBody = styled.div`
    ul {
        padding-left: 0;

        li {
            list-style-type: none;
        }
    }
`

const WhiteBlock = styled.div`
    background: #fff;
    padding: 10px;
    margin-bottom: 20px;
    border: #ccc;
`
const FeedBlock = styled.div`
    > div:not(:last-child) {
        margin-bottom: 20px;
    }
`
const FeederDetails = styled.div`
    img {
        margin-right: 15px;
        width: 50px;
        height: 50px;
    }
    span {
        font-size: 15px;
        font-weight: bold;
    }
`

const FeedPhoto = styled.div``

const FeedMessage = styled.div``

class HomePage extends React.Component {
    handleDeleteUser(id) {
        return e => this.props.deleteUser(id)
    }

    render() {
        const {user, users} = this.props
        return (
            <HomeBody>
                <div className="col-md-4">
                    <WhiteBlock className="text-center">
                        <img src="https://www.fakepersongenerator.com/Face/male/male20161086433600555.jpg" />
                        <h2>Hi {user.firstName}!</h2>
                    </WhiteBlock>

                    <WhiteBlock>
                        <h3>Users on Faceboook:</h3>
                        {users.loading && <em>Loading users...</em>}
                        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                        {users.items && (
                            <ul>
                                {users.items.map((user, index) => (
                                    <li key={user.id}>{user.firstName + ' ' + user.lastName}</li>
                                ))}
                            </ul>
                        )}
                    </WhiteBlock>
                </div>
                <div className="col-md-8">
                    <ul>
                        {feeds.map((feed, index) => (
                            <li key={index}>
                                <WhiteBlock>
                                    <FeedBlock>
                                        <FeederDetails>
                                            {feed.user.profpic && (
                                                <img className="img-circle" src={feed.user.profpic} />
                                            )}
                                            <span>{feed.user.name}</span>
                                        </FeederDetails>
                                        {feed.photo && (
                                            <FeedPhoto>
                                                <img src={feed.photo} className="img-responsive" />
                                            </FeedPhoto>
                                        )}
                                        {feed.message && <FeedMessage>{feed.message}</FeedMessage>}
                                    </FeedBlock>
                                </WhiteBlock>
                            </li>
                        ))}
                    </ul>
                </div>
            </HomeBody>
        )
    }
}

function mapState(state) {
    const {users, authentication} = state
    const {user} = authentication
    return {user, users}
}

const actionCreators = {
    deleteUser: userActions.delete,
}

const connectedHomePage = connect(
    mapState,
    actionCreators
)(HomePage)
export {connectedHomePage as HomePage}
