import React from 'react';
import { store } from '../../store';

export default class Cards extends React.Component {

    render() {
        const isPro =  store.getState().auth.isPro;

        const cssLi = {
            listStyleType : 'none'
        };

        const cssRight = {
            float : 'right',
            marginLeft: '1em'
        };

        const cssInline = {
            display : 'inline-block',
            width: '100%'
        };
        const addComment = isPro ? '' : (
            <a className="btn btn-primary mr-3 d-inline-block"
               href="#"
               data-toggle="modal"
               onClick={this.props.onClickModal}
               data-target="#createAvis"
               style={cssRight}
               title="Donner son avis"
               alt=""
               data-id={this.props.id}>
                Mon avis <i className="fa fa-fw fa-comment"></i>
            </a>
        );
        const getComment = isPro == false || (isPro && this.props.pageName == "myAnnonce") ? (
            <a className="btn btn-success mr-3 d-inline-block"
               href="#"
               data-toggle="modal"
               onClick={this.props.onClickModal}
               data-target="#getAvis"
               style={cssRight}
               title="Voir les avis"
               alt=""
               data-id={this.props.id}>
                Les avis <i className="fa fa-fw fa-star" data-id={this.props.id}></i>
            </a>
        ) : '';

        const addAnnonce = isPro && this.props.pageName == "allAnnonces" ? (
            <a className="btn btn-primary"
               href="#"
               data-toggle="modal"
               onClick={this.props.onClickModal}
               title="Ajouter cette annonce"
               alt=""
               data-target="#createAnnonce"
               data-id={this.props.id}
               data-title={this.props.title}
               data-url={this.props.content.url}
               data-category={this.props.content.category}
               data-location={this.props.content.location}
               data-price={this.props.content.prix}
               data-date={this.props.date}
               data-images={this.props.image ? this.props.image : false}>
                <i className={"fa fa-fw fa-plus"}>  </i>
                C'est mon annonce !
            </a>
        ) : '';

        const deleteAnnonce = isPro  && this.props.pageName == "myAnnonce" ? (
            <a className="btn btn-danger"
               href="#"
               data-toggle="modal"
               onClick={this.props.onClickModal}
               data-target="#deleteAnnonce"
               style={cssRight}
               title="Supprimer cette annonce"
               alt=""
               data-id={this.props.id}>

                <i className={"fa fa-fw fa-trash"} data-id={this.props.id}>  </i>
            </a>
        ) : '';


        return (
            <div className="card mb-3" data-id={this.props.id}>
                <a href="#">
                    <img className="card-img-top img-fluid w-100" src={this.props.image ? this.props.image : ''} alt="" />
                </a>
                <div className="card-body">
                    <h6 className="card-title mb-1"><a href="#">{this.props.title}</a></h6>
                    <p className="card-text small">
                        <li style={cssLi}>{this.props.content.category}</li>
                        <li style={cssLi}>{this.props.content.location}</li>
                        <li style={cssLi}>{this.props.content.prix}</li>
                        <li style={cssLi}><a href={this.props.content.url}>{this.props.content.url}</a></li>
                    </p>
                </div>
                <hr className="my-0" />
                <div className="card-body py-2 small">

                    {addAnnonce}
                </div>
                <hr className="my-0" />
                <div className="card-footer small text-muted" style={cssInline}>
                    Posté : {this.props.date}
                    {getComment}
                    {addComment}
                    {deleteAnnonce}
                </div>

            </div>
        )
    }
}

