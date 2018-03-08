import React from "react";

export class Table extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                    <thead>
                    <tr>
                        {this.props.header.map((h, i) =>
                            <th key={i}>{h}</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.children}
                    </tbody>
                </table>
            </div>
        );

    }
}
