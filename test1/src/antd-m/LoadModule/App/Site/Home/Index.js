import React from 'react';
import Banner from './Banner';
import GridSection from './GridSection'
import Navbar from './Navbar'
export default class Home extends React.Component {
    render() {
        const content = (
            <div>
                <Banner />
                <GridSection />
            </div>
        );
        return (
            <div>
                <Navbar content={content}/>
            </div>
        );
    }
}