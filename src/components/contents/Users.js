import React from 'react';
import Main from "../Main";
import Modal from "../layouts/Modal";
import InputForm from "../form/InputForm";
import {connect} from "react-redux";
import Table from "../table/Table";
import {putUser} from "../../redux/users/actions";
import {deleteUser} from "../../redux/users/actions";
import {getUsers} from "../../redux/users/actions";

export class Users extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userEmail: {
                value: "",
                error: false,
                message: ""
            },
            password:  {
                value: "",
                error: false,
                message: ""
            },
            delete: {
                userId: false,
                userName: ""
            },
            update: {
                userId: false,
                userName: ""
            }

        };

        this.modalDelete = this.modalDelete.bind(this);
        this.modalUpdate = this.modalUpdate.bind(this);
    }

    modalDelete(e) {
        e.preventDefault();

        this.setState({
            delete: {
                userId: e.target.parentElement.dataset["id"],
                userName: e.target.parentElement.dataset["name"]
            }
        });
    }

    modalUpdate(e) {
        e.preventDefault();

        this.setState({
            update: {
                userId: e.target.parentElement.dataset["id"],
                userName: e.target.parentElement.dataset["name"]
            }
        });
    }

    saveUser(e) {
        e.preventDefault();
        this.props.putUser(this.state.userEmail.value, this.state.password.value);
        console.log('save user');
    }

    deleteUser(e) {
        e.preventDefault();
        this.props.deleteUser(this.state.delete.userId);
        console.log('delete user');
        // console.log(e.target);
    }

    change(e) {
        let reg = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
        if (e.target.id === "inputEmail"){
            if (reg.test(e.target.value) === false) {
                this.setState({
                    userEmail: {
                        value: "",
                        error: true,
                        message: "Invalid Email"
                    }
                })

            } else {
                this.setState({
                    userEmail: {
                        value: e.target.value,
                        error: false,
                        message: ""
                    }
                })
            }
        } else {
            if ((e.target.value).length < 5){
                this.setState({
                    password: {
                        value: "",
                        error: true,
                        message: "To short password"
                    }
                })
            } else {
                this.setState({
                    password: {
                        value: e.target.value,
                        error: false,
                        message: ""
                    }
                })
            }

        }
    }

    render() {

        const styleAddUser = {
            position: 'absolute',
            right: '16px',
            top: '140px'
        };

        const styleTdHidden = {
            display: 'none'
        };

        const addUser = this.props.state.auth.isAdmin ? (
            <a className="btn btn-primary" style={styleAddUser} href="#" data-toggle="modal" data-target="#createUser">
                <i className={"fa fa-fw fa-plus"}>  </i>
                add User
            </a>
        ) : '';

        // const updateField = (id, name) => this.props.state.auth.isAdmin ? (
        //     <td><i className={"fa fa-fw fa-edit"}> </i> </td>
        // ) : '';

        const deleteField = (id, name) => this.props.state.auth.isAdmin ? (
            <td>
                <a href="#" data-toggle="modal" onClick={this.modalDelete} data-name={name} data-id={id} data-target="#deleteUser">
                    <i className={"fa fa-fw fa-trash"}> </i>
                </a>
            </td>
        ) : <td style={styleTdHidden}></td>;

        const headerTable =  this.props.state.auth.isAdmin ? ["User name", "Admin", "Pro", "Actions"] : ["User name", "Admin", "Pro"];

        return (
            <Main>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#">Accueil</a>
                    </li>
                    <li className="breadcrumb-item active">Utilisateurs</li>
                </ol>
                <h1>Utilisateurs</h1>
                {addUser}
                <hr />

                <div className="card mb-3">
                    <div className="card-body">
                        <Table header={headerTable}>
                            {this.props.state.users.map((u, i) =>
                                <tr key={u._id}>
                                    <td>{u.email}</td>
                                    <td>{u.admin ?
                                        <i className={"fa fa-fw fa-check-circle"}> </i>
                                        : <i className={"fa fa-fw fa-times"}> </i>}
                                    </td>
                                    <td>{u.isPro ?
                                        <i className={"fa fa-fw fa-check-circle"}> </i>
                                        : <i className={"fa fa-fw fa-times"}> </i>}
                                    </td>
                                    {/*{updateField}*/}
                                    {deleteField(u._id, u.email)}
                                </tr>
                            )}
                        </Table>
                    </div>

                </div>

                <Modal id={"createUser"}
                       title={"Create User"}
                       titleButton={"Create"}
                       onClick={this.saveUser.bind(this)}
                       error={(this.state.userEmail.error || this.state.password.error)}
                >
                    <form role="form">
                        <InputForm type="email"
                                   htmlFor="inputEmail"
                                   label="Email address"
                                   onChange={this.change.bind(this)}
                                   id="inputEmail"
                                   error={this.state.userEmail.error}
                                   errorMessage={this.state.userEmail.message}
                                   placeholder="Enter email"
                        />
                        <InputForm type="password"
                                   htmlFor="inputPassword"
                                   label="Password"
                                   onChange={this.change.bind(this)}
                                   id="inputPassword"
                                   error={this.state.password.error}
                                   errorMessage={this.state.password.message}
                                   placeholder="Password"
                        />
                    </form>
                </Modal>

                <Modal id={"deleteUser"}
                       title={"Delete User"}
                       titleButton={"Delete"}
                       data={this.state.delete.userId}
                       onClick={this.deleteUser.bind(this)}
                       error={false}
                >
                    Etes vous sur de vouloir supprimer {this.state.delete.userName}
                </Modal>
            </Main>
        );
    }
}

const mapStateToProps = function(state) {
    return {state};
};

const mapDispatchToProps = (dispatch) => {
    return {
        putUser: (userEmail, password) => dispatch(putUser(userEmail, password)),
        deleteUser: (id) => dispatch(deleteUser(id)),
        getUsers: () => dispatch(getUsers())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users)
