import React from 'react';
import Main from "../Main";
import Modal from "../layouts/Modal";
import {connect} from "react-redux";
import Cards from '../layouts/Cards';
import {getAnnonces, addAnnonce} from "../../redux/annonces/actions";
import {getAvis, putAvis} from "../../redux/avis/actions";

export class Annonces extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            annonce_id : false,
            title: "",
            url: "",
            category: "",
            location: "",
            price: 0,
            date: "",
            images: [],
            search: '',
            avisNote: 0,
            avisCommentaire: ""
        };

        this.getImage = this.getImage.bind(this);
        this.searchAnnonce = this.searchAnnonce.bind(this);
        this.applySearch = this.applySearch.bind(this);
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

    createAnnonce(){

        this.props.addAnnonce(
            this.state.annonce_id,
            this.state.title,
            this.state.url,
            this.state.category,
            this.state.location,
            this.state.price,
            this.state.date,
            this.state.images
        )
    }

    createAvis(e){
        e.preventDefault();
        this.props.putAvis(this.state.annonce_id,this.state.avisNote, this.state.avisCommentaire);
        console.log('save avis');
    }

    change(e) {
        if (e.target.id === "avisNote") {
            this.setState({
                avisNote: e.target.value
            })
        }

        if (e.target.id === "avisCommentaire"){
            this.setState({
                avisCommentaire: e.target.value
            })
        }
    }
    searchAnnonce(e){
        e.preventDefault();

        if(e.target.id === "searchAnnonce"){
            this.setState({ search : e.target.value });
        }

    }

    applySearch(e) {
        e.preventDefault();

        this.props.getAnnonces(this.state.search)
    }


    modalCreate(e) {
        e.preventDefault();
        this.setState({
            annonce_id: e.target.dataset['id'],
            title: e.target.dataset['title'],
            url: e.target.dataset['url'],
            category: e.target.dataset['category'],
            location: e.target.dataset['location'],
            price: e.target.dataset['price'],
            date: e.target.dataset['date'],
            images: e.target.dataset['images'] ? [{'large': e.target.dataset['images']}] : [],
        });
        // on récupère les avis quand on clique sur l'annonce
        this.props.getAvis(e.target.dataset['id']);
        // on remet à vide le select et le commentaire de la saisie de l'avis
        this.refs.avisCommentaire.value = "";
        this.refs.avisNote.value = 0;
    }

    render() {

        const styleSearchAnnonce = {
            position: 'absolute',
            right: '16px',
            top: '140px'
        };

        const styleWidth = {
            width : "90%"
        }

        const searchAnnonce = this.props.state.auth.isPro ? (
            <form className="form-inline my-2 my-lg-0 mr-lg-2" style={styleSearchAnnonce}>
                <div className="input-group">
                    <input  id="searchAnnonce" className="form-control" type="text" placeholder="Rechercher" onChange={this.searchAnnonce}/>
                    <span className="input-group-append">
                            <button className="btn btn-primary" type="button"
                                    onClick={this.applySearch}
                            >
                                <i className="fa fa-search"></i>
                            </button>
                        </span>
                </div>
            </form>
        ) : '';


        return (
            <Main>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#">Accueil</a>
                    </li>
                    <li className="breadcrumb-item active">Annonces</li>
                </ol>
                <h1>Annonces</h1>
                {searchAnnonce}
                <hr />

                <div className="card-columns">
                    {this.props.state.annonces.all.map((a, i) =>
                        <Cards key={i}
                               id={a._id ? a._id : a.id}
                               image={this.getImage(a)}
                               title={a.title}
                               onClickModal={this.modalCreate.bind(this)}
                               content={{
                                   category : a.category,
                                   location: a.location,
                                   prix: a.price,
                                   url: a.url,
                                   data: a.date
                               }}
                               date={a.date}
                               pageName={'allAnnonces'}
                        />


                    )}
                </div>

                <Modal id={"createAnnonce"}
                       title={"Ajouter une annonce"}
                       titleButton={"Ajouter"}
                       validateModal={true}
                       onClick={this.createAnnonce.bind(this)}
                       error={false}
                >
                    Êtes-vous sûr qu'il s'agit de votre annonce ?
                </Modal>

                <Modal id={"getAvis"}
                       title={"Les avis sur cette annonce"}
                       validateModal={false}
                       error={false}
                >
                    {this.props.state.avis.all.length > 0 ? (this.props.state.avis.all.map((a,i)=>
                        <p key={i}><b>{a.owner.nom}</b> {a.note}/5 - {a.commentaire} </p>
                    )) : <p> Aucun avis pour le moment</p> }
                </Modal>

                <Modal id={"createAvis"}
                       title={"Donner son avis"}
                       validateModal={true}
                       titleButton={"Soumettre"}
                       onClick={this.createAvis.bind(this)}
                       error={false}
                >
                    Note : &nbsp;
                    <select
                        id="avisNote"
                        ref="avisNote"
                        onChange={this.change.bind(this)}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br/>
                    Commentaire : <br/>
                    <textarea
                        style={styleWidth}
                        id="avisCommentaire"
                        ref="avisCommentaire"
                        onChange={this.change.bind(this)}>
                    </textarea>
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
        getAnnonces: (query) => dispatch(getAnnonces(query)),
        addAnnonce: (id,  title, url, category, location, price, date, images) => dispatch(addAnnonce(id, title, url, category, location, price, date, images)),
        getAvis: (id) => dispatch(getAvis(id)),
        putAvis: (id, note, commentaire) => dispatch(putAvis(id, note, commentaire)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Annonces)
