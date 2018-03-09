import React from 'react';
import Main from "../Main";
import Modal from "../layouts/Modal";
import InputForm from "../Form/InputForm";
import {connect} from "react-redux";
import Cards from '../layouts/Cards';
import {getAnnonces} from "../../redux/annonces/actions";

export class Annonces extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        console.log(this.props.state.annonces);
        const styleAddAnnonce = {
            position: 'absolute',
            right: '16px',
            top: '140px'
        };

        const addAnnonce = this.props.state.auth.isPro ? (
            <a className="btn btn-primary" style={styleAddAnnonce} href="#" data-toggle="modal" data-target="#createAnnonce">
                <i className={"fa fa-fw fa-plus"}>  </i>
                add Annonce
            </a>
        ) : '';

        // a.main_image.length > 0 ? a.main_image.medium : ''


        return (
            <Main>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#">Accueil</a>
                    </li>
                    <li className="breadcrumb-item active">Annonces</li>
                </ol>
                <h1>Annonces</h1>
                {addAnnonce}
                <hr />

                <div className="card-columns">
                    {this.props.state.annonces.map((a, i) =>
                        <Cards key={a._id}
                               // image={}
                               title={a.title}
                               content={{
                                   category : a.category,
                                   location: a.location,
                                   prix: a.price,
                                   url: a.url
                               }}
                               date={a.date}
                        />


                    )}
                </div>

            </Main>
        )
    }


}

const mapStateToProps = function(state) {
    return {state};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAnnonces: () => dispatch(getAnnonces())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Annonces)
