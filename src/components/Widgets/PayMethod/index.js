import React from 'react';
import SourceImg from '@/assets/images';
import './PayMethod.css';
function PayMethod() {
    return (
        <ul className="footer-payment__list">
            <li className="footer-payment__item">
                <img src={SourceImg.cashLogo} alt="" className="footer-payment__logo" />
            </li>
            <li className="footer-payment__item">
                <img src={SourceImg.visaLogo} alt="" className="footer-payment__logo" />
            </li>
            <li className="footer-payment__item">
                <img
                    src={SourceImg.mastercardLogo}
                    alt=""
                    className="footer-payment__logo"
                />
            </li>
            <li className="footer-payment__item">
                <img src={SourceImg.vnpayLogo} alt="" className="footer-payment__logo" />
            </li>
        </ul>
    );
}

export default PayMethod;
