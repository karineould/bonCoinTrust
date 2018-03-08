import React from 'react';
import { getToken } from '../../redux/auth/actions';
import {connect} from "react-redux";
import {InputForm} from "../form/InputForm";

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userEmail: "",
            password: "",
            error: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    change(e) {
        if (e.target.id === "inputEmail"){
            this.setState({
                userEmail: e.target.value
            })
        } else {
            this.setState({
                password: e.target.value
            })
        }
    }

    handleClick(e) {
        e.preventDefault();
        this.props.getToken(this.state.userEmail, this.state.password);

        this.setState({
            error: !this.props.state.auth.error.success
        });

        console.log(this.props.state.auth);
    }

    render() {

        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <form role="form">
                            <InputForm type="email"
                                       htmlFor="inputEmail"
                                       label="Email address"
                                       onChange={this.change.bind(this)}
                                       id="inputEmail"
                                       error={this.state.error}
                                       errorMessage={this.props.state.auth.error.message.email}
                                       placeholder="Enter email"
                            />
                            <InputForm type="password"
                                       htmlFor="inputPassword"
                                       label="Password"
                                       onChange={this.change.bind(this)}
                                       id="inputPassword"
                                       error={this.state.error}
                                       errorMessage={this.props.state.auth.error.message.password}
                                       placeholder="Password"
                            />
                            <a className="btn btn-primary btn-block" onClick={this.handleClick} href="/">Login</a>
                        </form>

                        <div className="text-center">
                            <a className="d-block small mt-3" href="">Register an Account</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {state};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getToken: (userEmail, password) => dispatch(getToken(userEmail, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
