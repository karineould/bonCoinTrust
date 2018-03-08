import React from 'react';

export default class ScrollButton extends React.Component {

    render() {
        return (
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fa fa-angle-up"></i>
            </a>
        );
    }
}

