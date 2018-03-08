import React from 'react';
import Main from "../Main";
import {connect} from "react-redux";
import {getUsers} from "../../redux/users/actions";
import {Link} from 'react-router-dom';

export class Accueil extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        return (
            <Main>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#">Accueil</a>
                    </li>
                    <li className="breadcrumb-item active">Principale</li>
                </ol>
                <h1>Accueil</h1>
                <div className="row">
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-primary o-hidden h-100">
                            <div className="card-body">
                                <div className="card-body-icon">
                                    <i className="fa fa-fw fa-users"></i>
                                </div>
                                <div className="mr-5">0 Users!</div>
                            </div>
                            <Link to="/users">
                                <div className="card-footer text-white clearfix small z-1">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                                </div>
                            </Link>

                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-warning o-hidden h-100">
                            <div className="card-body">
                                <div className="card-body-icon">
                                    <i className="fa fa-fw fa-wrench"></i>
                                </div>
                                <div className="mr-5">0 Avis!</div>
                            </div>
                            <Link to="/materiels">
                                <div className="card-footer text-white clearfix small z-1">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-success o-hidden h-100">
                            <div className="card-body">
                                <div className="card-body-icon">
                                    <i className="fa fa-fw fa-cart-arrow-down"></i>
                                </div>
                                <div className="mr-5">0 Annonces!</div>
                            </div>
                            <Link to="/emprunts">
                                <div className="card-footer text-white clearfix small z-1">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Main>
        );
    }
}

const mapStateToProps = function(state) {
    return {state};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Accueil)
