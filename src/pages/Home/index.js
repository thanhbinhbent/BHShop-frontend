import Sidebar from '@/components/Widgets/Sidebar';
import Slide from '@/components/Carousel';
import BestSeller from '@/components/Widgets/BestSeller';
import ProductForWeek from '@/components/Widgets/ProductForWeek';
import Coupon from '@/components/Widgets/CouponNotification';
import NewProducts from '@/components/Widgets/NewProducts';
import VerticalBanner from '@/components/VerticalBanner';
import SourceImg from '@/assets/images';
import './Home.css';
function HomePage() {
    return (
        <div className="container">
            <div className="home-container">
                <div className="home-col home-col--left">
                    <Sidebar></Sidebar>
                    <div className="home-banner__container home-banner--vertical">
                        <VerticalBanner
                            uri="thanhbinhbent.com"
                            imgUrl={SourceImg.bannerleft1}
                            title={'Bánh ngon độc lạ'}
                            value={'-20%'}
                            description={'Giảm giá nhân ngày 8/3'}
                        ></VerticalBanner>
                        <VerticalBanner
                            uri="thanhbinhbent.com"
                            className="home-banner--vertical"
                            imgUrl={SourceImg.bannerleft2}
                            title={'Bánh ngon độc lạ'}
                            value={'-20%'}
                            description={'Giảm giá nhân ngày 8/3'}
                        ></VerticalBanner>
                    </div>
                </div>
                <div className="home-col home-col--right">
                    <div className="home-carouse home-carousel__container">
                        <Slide className="home-carousel"></Slide>
                    </div>
                    <BestSeller></BestSeller>
                    <ProductForWeek></ProductForWeek>
                    <Coupon></Coupon>
                    <NewProducts></NewProducts>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
