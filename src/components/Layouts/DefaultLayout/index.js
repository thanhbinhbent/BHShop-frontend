import Header from '@/components/Header';
import Footer from '@/components/Footer';

function DefaultLayout({ children }) {
    return (
        <>
            <Header></Header>
            <div className="main-page">{children}</div>
            <Footer></Footer>
        </>
    );
}

export default DefaultLayout;
