import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function DefaultLayout(props) {
    const { children, cartItems } = props;
    return (
        <>
            <Header cartItems={cartItems}></Header>
            <div className="main-page">{children}</div>
            <Footer></Footer>
        </>
    );
}

export default DefaultLayout;
