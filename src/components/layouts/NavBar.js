import React from 'react';
import ItemSideBar from './ItemSideBar';
import { store } from '../../store';

export default class NavBar extends React.Component {

    render() {
        const userEmail = store.getState().auth.userEmail;
        const isAdmin = store.getState().auth.isAdmin;
        const isPro = store.getState().auth.isPro;

        const navBar = isAdmin ? (
            <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
                <ItemSideBar title="Accueil" link="/" icon="fa fa-fw fa-dashboard" />
                <ItemSideBar title="Utilisateurs" link="/users" icon="fa fa-fw fa-users" />
                <ItemSideBar title="Annonces" link="/annonces" icon="fa fa-fw fa-th-list" />
            </ul>
        ) : (
            <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
                <ItemSideBar title="Accueil" link="/" icon="fa fa-fw fa-dashboard" />
                {isPro ? (
                    <div>
                        <ItemSideBar title="Profil" link="/user" icon="fa fa-fw fa-user" />
                        <ItemSideBar title="Annonces" link="/annonces" icon="fa fa-fw fa-th-list" />
                        <ItemSideBar title="Mes annonces" link="/myAnnonces" icon="fa fa-fw fa-star" />
                    </div>
                ) : (
                    <div>
                        <ItemSideBar title="Profil" link="/user" icon="fa fa-fw fa-user" />
                        <ItemSideBar title="Annonces" link="/annonces" icon="fa fa-fw fa-th-list" />
                    </div>
                )}
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                <a className="navbar-brand" href="">Bon Coin Trust</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    {navBar}
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <div className="nav-link">
                                <i className="fa fa-fw fa-user"></i>
                                {userEmail}
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="modal" data-target="#exampleModal">
                                <i className="fa fa-fw fa-sign-out"></i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

