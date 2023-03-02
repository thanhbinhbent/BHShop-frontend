import './VerticalBanner.css';
function VerticalBanner(props) {
    const { imgUrl, title, value, description, uri } = props;
    return (
        <div className="banner-container--vertical">
            <a href={uri} className="banner-container__link">
                <img src={imgUrl} alt={title} className="banner__img" />
                <div className="banner-content">
                    <h3 className="banner__title">{title}</h3>
                    <p className="banner__desc">{description}</p>
                    <span className="banner__value">{value}</span>
                </div>
            </a>
        </div>
    );
}

export default VerticalBanner;
