import React, { Component } from 'react';
import Login from './Login';

class Dashboard extends Component {

    render() {

        return (
            <div className="row">
                <div className="col-lg-4 offset-lg-4">
                    <Login />
                </div>
            </div>
        );
    };
}

export default Dashboard;