import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";  
import Slider from "react-slick";

function TopSlider(){
    const settings = {
        dots: true,
        infinite: true,
        speed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear"
      };

    return (
        <>
          <Slider {...settings}>
            <div className="bg-image img1"></div>
            <div className="bg-image img2"></div>
            <div className="bg-image img3"></div>
            <div className="bg-image img4"></div>
            <div className="bg-image img5"></div>
          </Slider>
        </>        
    );
}

export default TopSlider;