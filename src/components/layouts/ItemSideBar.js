import React from 'react';
import {Link} from 'react-router-dom';

export default class ItemNavBar extends React.Component {

    render() {
        return (
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title={this.props.title}>
                <Link to={this.props.link}>
                    <div className="nav-link">
                        <i className={this.props.icon}> </i>
                        <span className="nav-link-text">&nbsp;{this.props.title}</span>
                    </div>
                </Link>
            </li>
        );
    }
}
