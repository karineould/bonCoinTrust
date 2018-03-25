import React from 'react';
import NavBar from "./layouts/NavBar";
import ScrollButton from "./layouts/ScrollButton";
import Modal from "./layouts/Modal";
import Footer from "./layouts/Footer";
import {connect} from "react-redux";
import {resetAuth} from "../redux/auth/actions";

export class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.resetAuth();
    }


    render() {
        return (
            <div>
                <NavBar/>
                <div className="content-wrapper">
                    <div className="container-fluid">
                        {this.props.children}
                    </div>
                    <Footer/>
                    <ScrollButton/>
                    <Modal id={"exampleModal"}
                           title={"Déconnexion"}
                           titleButton={"Déconnexion"}
                           onClick={this.handleClick.bind(this)}
                           error={false}
                           validateModal={true}
                    >
                        Êtes-vous sûr de vouloir vous déconnecter ?
                    </Modal>
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
        resetAuth: () => dispatch(resetAuth())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main)
