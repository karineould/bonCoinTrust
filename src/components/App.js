import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './login/Login';
import Accueil from './contents/Accueil';
import User from './contents/Users';
import Annonce from './contents/Annonces';


export class App extends React.Component {

    render() {

        console.log(this.props.state.auth);
        if (!this.props.state.auth.isLogged) {
            return (
                <Router>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Redirect to="/login" />
                    </Switch>
                </Router>
            );
        }

        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Accueil}/>
                    <Route path='/users' component={User}/>
                    <Route path='/annonces' component={Annonce}/>

                    <Redirect from="/login" to="/"/>
                </Switch>
            </Router>
        );
    }
}


const mapStateToProps = function(state) {
    return {state};
};

export default connect(mapStateToProps)(App)
