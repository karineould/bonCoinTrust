import React from 'react';

export default class InputForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const errorMessage = this.props.errorMessage ? (
            <small className="text-danger">
                {this.props.errorMessage}
            </small>
        ) : '';

        if (this.props.error) {
             return (
                 <div className="form-group" style={this.props.styleform}>
                     <label style={this.props.stylelabel} className="text-danger" htmlFor={this.props.htmlFor}>{this.props.label}</label>
                     <input className="form-control is-invalid"
                            id={this.props.id}
                            onChange={this.props.onChange}
                            type={this.props.type}
                            placeholder={this.props.placeholder}
                            onFocus={this.props.onChange}

                     />
                     {errorMessage}
                 </div>
            );
        }

        return (
            <div className="form-group" style={this.props.styleform} >
                <label style={this.props.stylelabel}  htmlFor={this.props.htmlFor}>{this.props.label}</label>
                <input className="form-control"
                       id={this.props.id}
                       onChange={this.props.onChange}
                       type={this.props.type}
                       placeholder={this.props.placeholder}
                       onFocus={this.props.onChange}
                />
            </div>
        )
    }
}
