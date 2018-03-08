import React from 'react';
import ItemSideBar from './ItemSideBar';
import { store } from '../../store';

export default class NavBar extends React.Component {

    render() {
        const userEmail = store.getState().auth.userEmail;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                <a className="navbar-brand" href="">Labo IOT</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
                        <ItemSideBar title="Accueil" link="/" icon="fa fa-fw fa-dashboard" />
                        <ItemSideBar title="Utilisateurs" link="/users" icon="fa fa-fw fa-table" />
                        {/*<ItemSideBar title="Materiels" link="/materiels" icon="fa fa-fw fa-wrench" />*/}
                        {/*<ItemSideBar title="Emprunts" link="/emprunts" icon="fa fa-fw fa-cart-arrow-down" />*/}
                        {/*<ItemSideBar title="Categories" link="/categories" icon="fa fa-fw fa-sitemap" />*/}
                    </ul>
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

