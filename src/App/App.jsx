import React from 'react'
import {Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {history} from '../_helpers'
import {alertActions, userActions} from '../_actions'
import {PrivateRoute} from '../_components'
import {HomePage} from '../HomePage'
import {LoginPage} from '../LoginPage'
import {ProfilePage} from '../ProfilePage'
import {RegisterPage} from '../RegisterPage'

import styled from 'styled-components'

const FaceboookBody = styled.div``

const Logo = styled.span`
    color: darkblue !important;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 25px;
`

const NavProfile = styled.span`
    display: inline-block;
    position: relative;
    padding-right: 20px;
    padding-left: 10px;

    > img {
        width: 30px;
        height: auto;
        position: absolute;
        top: -20px;
    }
`

class App extends React.Component {
    constructor(props) {
        super(props)

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts()
            this.props.getUsers()
        })
    }

    render() {
        const {alert} = this.props
        const {user} = this.props
        return (
            <FaceboookBody>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">
                                <Logo>FACEBOOOK</Logo>
                            </a>
                        </div>
                        {user && (
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <a href="/profile">
                                        Edit Profile
                                        <NavProfile>
                                            <img
                                                className="img-circle"
                                                src="https://www.fakepersongenerator.com/Face/male/male20161086433600555.jpg"
                                            />
                                        </NavProfile>
                                    </a>
                                </li>
                                <li>
                                    <a href="/login">
                                        <span className="glyphicon glyphicon-log-out" /> Logout
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                </nav>
                <div className="jumbotron">
                    <div className="container">
                        <div className="col-sm-12">
                            {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
                            <Router history={history}>
                                <div>
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute exact path="/profile" component={ProfilePage} />
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/register" component={RegisterPage} />
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
            </FaceboookBody>
        )
    }
}

function mapState(state) {
    const {alert, authentication} = state
    const {user} = authentication
    return {alert, user}
}

const actionCreators = {
    getUsers: userActions.getAll,
    clearAlerts: alertActions.clear,
}

const connectedApp = connect(
    mapState,
    actionCreators
)(App)
export {connectedApp as App}
