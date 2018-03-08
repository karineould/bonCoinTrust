import React from 'react';

export class SelectForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const errorMessage = this.props.errorMessage ? (
            <small className="text-danger">
                {this.props.errorMessage}
            </small>
        ) : '';

        const select = this.props.onChange ? (
            <select className={"form-control " + (this.props.error ? "text-danger" : "")} onChange={this.props.onChange} onFocus={this.props.onChange} id={this.props.id}>
                <option value={0} key={0}> Choose </option>
                {this.props.value.map((v) =>
                    <option value={v._id} key={v._id}> {v.nom} </option>
                )}
            </select>
        ) : (
            <select className={"form-control " + (this.props.error ? "text-danger" : "")} id={this.props.id}>
                <option value={0} key={0}> Choose </option>
                {this.props.value.map((v) =>
                    <option value={v._id} key={v._id}> {v.nom} </option>
                )}
            </select>
        );

        return (

            <div className="form-group">
                <label htmlFor={this.props.for} className={this.props.error ? "text-danger" : ""}>{this.props.label}</label>
                {select}
                {errorMessage}
            </div>
        )
    }
}

