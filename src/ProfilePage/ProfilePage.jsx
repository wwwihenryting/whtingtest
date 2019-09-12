import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {userActions} from '../_actions'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
            },
            isEmail: true,
            submitted: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target
        const {user} = this.state
        if (name == 'username') {
            this.setState({isEmail: this.validateEmail(value)})
        }
        this.setState({
            user: {
                ...user,
                [name]: value,
            },
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        this.setState({submitted: true})
        const {user} = this.state
        if (user.firstName && user.lastName && user.username && user.password && this.validateEmail(user.username)) {
            this.props.register(user)
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    }

    render() {
        const {user, users} = this.props
        const {submitted, isEmail} = this.state
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Edit Profile</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="profilepic">Profile Picture</label>
                        <input
                            type="file"
                            className="form-control"
                            name="profilepic"
                            value={user.profilepic}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={user.firstName}
                            onChange={this.handleChange}
                        />
                        {submitted && !user.firstName && <div className="help-block">First Name is required</div>}
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={user.lastName}
                            onChange={this.handleChange}
                        />
                        {submitted && !user.lastName && <div className="help-block">Last Name is required</div>}
                    </div>
                    <div className={'form-group' + ((submitted && !user.username) || !isEmail ? ' has-error' : '')}>
                        <label htmlFor="username">E-Mail</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={user.username}
                            onChange={this.handleChange}
                        />
                        {submitted && !user.username && <div className="help-block">E-Mail is required</div>}
                        {!isEmail && <div className="help-block">E-Mail is not valid</div>}
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={user.password}
                            onChange={this.handleChange}
                        />
                        {submitted && !user.password && <div className="help-block">Password is required</div>}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Update</button>
                        <Link to="/" className="btn btn-link">
                            Back
                        </Link>
                    </div>
                </form>
            </div>
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

const connectedProfilePage = connect(
    mapState,
    actionCreators
)(ProfilePage)
export {connectedProfilePage as ProfilePage}
