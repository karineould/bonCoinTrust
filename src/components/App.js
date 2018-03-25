import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './login/Login';
import Register from './register/Register';
import Accueil from './contents/Accueil';
import User from './contents/Users';
import Annonce from './contents/Annonces';
import MyAnnonce from "./contents/MyAnnonces";


export class App extends React.Component {

    render() {

        if (!this.props.state.auth.isLogged) {
            return (
                <Router>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path='/register' component={Register} />
                        <Redirect to="/login" />
                    </Switch>
                </Router>
            );
        } else {
            return (
                <Router>
                    <Switch>
                        <Route exact path='/' component={Accueil}/>
                        <Route path='/users' component={User}/>
                        <Route path='/annonces' component={Annonce}/>
                        <Route path='/myAnnonces' component={MyAnnonce} />
                        <Route path='/register' component={Register} />
                        <Redirect from="/login" to="/"/>
                    </Switch>
                </Router>
            );
        }

    }
}


const mapStateToProps = function(state) {
    return {state};
};

export default connect(mapStateToProps)(App)
