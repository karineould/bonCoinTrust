import React from 'react';
import Main from "../Main";
import {connect} from "react-redux";
import Cards from '../layouts/Cards';
import {getAnnonces} from "../../redux/annonces/actions";

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
                    {this.props.state.annonces.mine.map((a, i) =>
                        <Cards key={i}
                               id={a._id ? a._id : a.id}
                               image={this.getImage(a)}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAnnonces)
