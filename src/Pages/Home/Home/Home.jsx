import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../popularMenu/popularMenu';
import Featured from '../Featured/Featured';
import Teastimonial from '../Teastimonial/Teastimonial';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Product Hunt | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Teastimonial></Teastimonial>

        </div>
    );
};

export default Home;