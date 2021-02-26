
import React, { Component } from 'react';
import MenuBar from '../menubar';

class Home extends Component {
    render() {
        return (
            <>
                <div className="row page-header">
                    <div className="col-12">
                        <h2>Home</h2>
                    </div>
                </div>
                <div className="row mx-auto page-content">
                    <div className="col-12">
                        <div className="row verticalPadding15px">
                            <h4>Comming Soon!</h4>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Home;