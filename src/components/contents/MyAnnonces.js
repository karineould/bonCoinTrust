import React from 'react';
import Main from "../Main";
import {connect} from "react-redux";
import Cards from '../layouts/Cards';
import Modal from "../layouts/Modal";
import {getAnnonces, deleteAnnonce} from "../../redux/annonces/actions";
import {getAvis} from "../../redux/avis/actions";

export class MyAnnonces extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            annonce_id: false
        };

        this.getImage = this.getImage.bind(this);
    }

    getImage(item) {
        if (item.images) {
            return item.images[0].large;
        }

        if (item.main_image !== null){
            return item.main_image.large;
        }

        return '';

    }

    deleteAnnonce(){
        console.log(this.state);
        this.props.deleteAnnonce(
            this.state.annonce_id
        )
    }

    getAvisOfAnnonce(){
        console.log(this.state);
        this.props.getAvis(
            this.state.annonce_id
        )
    }

    modalCreate(e) {
        e.preventDefault();

        let idAnnonce =  e.target.dataset['id'];
        this.setState({
            annonce_id: idAnnonce
        });
        this.props.getAvis(idAnnonce)

    }

    render() {

        return (
            <Main>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#">Accueil</a>
                    </li>
                    <li className="breadcrumb-item active">Mes annonces</li>
                </ol>
                <h1>Mes annonces</h1>
                <hr />

                <div className="card-columns">
                    {this.props.state.annonces.mine.length > 0 ?
                        this.props.state.annonces.mine.map((a, i) =>
                        <Cards key={i}
                               id={a._id ? a._id : a.id}
                               image={this.getImage(a)}
                               title={a.title}
                               onClickModal={this.modalCreate.bind(this)}
                               content={{
                                   category : a.category,
                                   location: a.location,
                                   prix: a.price,
                                   url: a.url
                               }}
                               date={a.date}
                               pageName={'myAnnonce'}
                        />


                    ) : <b> Vous n'avez aucune annonce !</b>}
                </div>

                <Modal id={"deleteAnnonce"}
                       title={"Supprimer une annonce"}
                       titleButton={"Supprimer"}
                       validateModal={true}
                       onClick={this.deleteAnnonce.bind(this)}
                       error={false}
                > Êtes-vous sûr de vouloir supprimer cette annonce ?
                </Modal>

                <Modal id={"getAvis"}
                       title={"Les avis sur cette annonce"}
                       validateModal={false}
                       onClick={this.getAvisOfAnnonce.bind(this)}
                       avis={this.props.state.avis.all}
                       error={false}
                >
                    {this.props.state.avis.all.length > 0 ? (this.props.state.avis.all.map((a,i)=>
                        <p key={i}> <b>{a.owner.nom}</b> {a.note}/5 - {a.commentaire} </p>
                    )) : <p> Aucun avis pour le moment</p> }
                </Modal>
            </Main>
        )
    }
}

const mapStateToProps = function(state) {
    return {state};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAnnonces: () => dispatch(getAnnonces()),
        deleteAnnonce: (id) => dispatch(deleteAnnonce(id)),
        getAvis: (id) => dispatch(getAvis(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAnnonces)
