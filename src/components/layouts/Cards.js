import React from 'react';
import { store } from '../../store';

export default class Cards extends React.Component {

    render() {
        const isPro =  store.getState().auth.isPro;

        const cssLi = {
            listStyleType : 'none'
        };

        const comment = isPro ? '' : (
            <a className="mr-3 d-inline-block" href="#">
                <i className="fa fa-fw fa-comment"></i>Comment
            </a>
        );

        const addAnnonce = isPro && this.props.onClickModal ? (
            <a className="btn btn-primary"
               href="#"
               data-toggle="modal"
               onClick={this.props.onClickModal}
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
                    {comment}
                    {addAnnonce}
                </div>
                <hr className="my-0" />
                <div className="card-footer small text-muted">
                    Posted : {this.props.date}</div>
            </div>
        )
    }
}

