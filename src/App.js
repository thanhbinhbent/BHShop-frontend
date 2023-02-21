import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import '@/App.css';
import { publicRoutes, privateRoutes } from '@/routes';
import { DefaultLayout } from '@/components/Layouts';
function App() {
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
                            const Page = route.component;
                            const Layout = route.layout || DefaultLayout;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
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
