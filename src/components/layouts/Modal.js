import React from 'react';

export default class Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const buttonValidate = this.props.onClick ? (
            <button className={"btn btn-primary " + (this.props.error ? "disabled": "")} onClick={this.props.onClick} type="button" data-dismiss="modal">{this.props.titleButton}</button>
        ) : (
            <button className={"btn btn-primary " + (this.props.error ? "disabled": "")} type="button" data-dismiss="modal">{this.props.titleButton}</button>
        );

        return (
            <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">{this.props.children}</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Annuler</button>
                            {buttonValidate}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}




