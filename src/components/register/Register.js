import React from 'react';
import { register } from '../../redux/auth/actions';
import {connect} from "react-redux";
import InputForm from "../form/InputForm";

export class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            userEmail: "",
            password: "",
            isPro: false,
            error: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    change(e) {
        if (e.target.id === "inputNom"){
            this.setState({
                userName: e.target.value
            })
        }
        if (e.target.id === "inputEmail"){
            this.setState({
                userEmail: e.target.value
            })
        }
        if (e.target.id === "inputPassword"){
            this.setState({
                password: e.target.value
            })
        }

        if (e.target.id === "inputIsPro"){
            this.setState({
                isPro: (this.state.isPro ? false : true)
            })
            // console.log(this.state.isPro);
        }
    }

    handleClick(e) {
        e.preventDefault();
        this.props.register(this.state.userName, this.state.userEmail, this.state.password, this.state.isPro);

        console.log(this.props.state)
        console.log(this.props.state.auth.errorCreateUser);

    }

    render() {

        const styleCenter = {
            textAlign : 'center'
        }

        const styleFlex = {
            display : 'flex'
        }

        const styleWidth = {
            width : '100%'
        }

        if(this.props.state.auth.user){
            alert("Votre inscription est réussie ! Vous pouvez vous connecter")
            window.location.href = "/login"
        }
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header" style={styleCenter}><b>Inscription</b></div>
                    <div className="card-body">
                        <form role="form">
                            <InputForm type="text"
                                       htmlFor="inputNom"
                                       label="Nom"
                                       onChange={this.change.bind(this)}
                                       id="inputNom"
                                       // error={this.state.error}
                                       error={(this.props.state.auth.errorCreateUser && this.props.state.auth.errorCreateUser.nom ? true : false)}
                                       errorMessage={(this.props.state.auth.errorCreateUser && this.props.state.auth.errorCreateUser.nom? this.props.state.auth.errorCreateUser.nom.message : '')}
                                       placeholder="Entrez votre nom"
                            />
                            <InputForm type="email"
                                       htmlFor="inputEmail"
                                       label="Email"
                                       onChange={this.change.bind(this)}
                                       id="inputEmail"
                                       error={(this.props.state.auth.errorCreateUser && this.props.state.auth.errorCreateUser.email ? true : false)}
                                       errorMessage={(this.props.state.auth.errorCreateUser && this.props.state.auth.errorCreateUser.email? this.props.state.auth.errorCreateUser.email.message : '')}
                                       placeholder="Entrez votre email"
                            />
                            <InputForm type="password"
                                       htmlFor="inputPassword"
                                       label="Mot de passe"
                                       onChange={this.change.bind(this)}
                                       id="inputPassword"
                                       error={(this.props.state.auth.errorCreateUser && this.props.state.auth.errorCreateUser.password ? true : false)}
                                       errorMessage={(this.props.state.auth.errorCreateUser && this.props.state.auth.errorCreateUser.password? this.props.state.auth.errorCreateUser.password.message : '')}
                                       placeholder="Entre votre mot de passe"
                            />
                            <InputForm type="checkbox"
                                       htmlFor="inputIsPro"
                                       label="Professionnel ?"
                                       onChange={this.change.bind(this)}
                                       id="inputIsPro"
                                       error={this.state.error}
                                       styleform={styleFlex}
                                       stylelabel={styleWidth}
                                // errorMessage={this.props.state.auth.error.message.email}
                                //        placeholder="Entrez votre email"
                            />
                            <a className="btn btn-primary btn-block" onClick={this.handleClick} href="/">Inscription</a>
                        </form>
                        <div className="text-center">
                            <a className="d-block small mt-3" href="/login" link="/login">Connexion</a>
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
        register: (userName, userEmail, password, isPro) => dispatch(register(userName, userEmail, password, isPro))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)
