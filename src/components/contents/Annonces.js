import React from 'react';
import Main from "../Main";
import Modal from "../layouts/Modal";
import {connect} from "react-redux";
import Cards from '../layouts/Cards';
import {getAnnonces, addAnnonce} from "../../redux/annonces/actions";

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
            search: ''
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
        console.log(this.state);
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
    }

    render() {

        console.log(this.props.state.annonces);
        const styleSearchAnnonce = {
            position: 'absolute',
            right: '16px',
            top: '140px'
        };

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
                        />


                    )}
                </div>

                <Modal id={"createAnnonce"}
                       title={"Ajouter une annonce"}
                       titleButton={"Ajouter"}
                       onClick={this.createAnnonce.bind(this)}
                       error={false}
                >
                    Etes vous sur que ce soit votre annonce ?
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
        addAnnonce: (id,  title, url, category, location, price, date, images) => dispatch(addAnnonce(id, title, url, category, location, price, date, images))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Annonces)
