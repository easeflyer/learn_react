import React from 'react';
import Banner from './Banner';
import GridSection from './GridSection'
import Navbar from './Navbar'
import Menu from './Menu'
export default class Home extends React.Component {
    state = {
        showMenu: false,
    }
    toggleMenuBar = () => {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }
    render() {
        return (
            <div>
                <Navbar toggleMenuBar={this.toggleMenuBar} />
                {this.state.showMenu ? <Menu /> : null}
                <Banner />
                <GridSection />
            </div>
        );
    }
}