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
            annonce_id : false
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

    createAnnonce(){
        this.props.addAnnonce(this.state.annonce_id)
    }

    modalCreate(e) {
        e.preventDefault();

        this.setState({
            annonce_id: e.target.dataset['id']
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
                    <input className="form-control" type="text" placeholder="Enter your compagny" />
                    <span className="input-group-append">
                            <button className="btn btn-primary" type="button">
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
                                   url: a.url
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
        getAnnonces: () => dispatch(getAnnonces()),
        addAnnonce: (id) => dispatch(addAnnonce(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Annonces)
