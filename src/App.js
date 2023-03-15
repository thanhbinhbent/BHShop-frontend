import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import '@/App.css';
import { publicRoutes, privateRoutes } from '@/routes';
import { DefaultLayout } from '@/components/Layouts';
function App() {
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };
    return (
        <Router>
            <div>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#233a95',
                        },
                    }}
                >
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const { component: Component, children, ...rest } = route;
                            const Layout = route.layout || DefaultLayout;
                            const Page = route.component;
                            return (
                                <Route
                                    exact
                                    path={route.path}
                                    key={index}
                                    element={
                                        <Layout cartItems={cartItems}>
                                            <Page {...rest} addToCart={addToCart}>
                                                {children && <Outlet />}
                                            </Page>
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </ConfigProvider>
            </div>
        </Router>
    );
}

export default App;
