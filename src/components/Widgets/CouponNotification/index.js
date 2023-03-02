import './CouponNoti.css';
function CouponNotification() {
    return (
        <div className="coupon-noti">
            <p className="coupon-noti__content">
                <span>
                    Siêu ưu đãi cho <u>đơn hàng đầu tiên</u>
                </span>
                <a href="thanhbinhbent.com">
                    <span className="coupon__code--fist">KLFK2023</span>
                </a>
                <span className="coupo-noti__desc">Sử dụng mã này khi thanh toán!</span>
            </p>
        </div>
    );
}

export default CouponNotification;
