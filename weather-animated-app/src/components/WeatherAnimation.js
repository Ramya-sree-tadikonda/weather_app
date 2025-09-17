import React from "react";
import Lottie from "lottie-react";
import rainAnimation from "../animations/rain.json";
import sunAnimation from "../animations/sunny-icon.json";
import cloudsAnimation from "../animations/cloudy.json";

function WeatherAnimation({ weatherCondition }) {
    let animationData = sunAnimation; // Default

    if (weatherCondition.toLowerCase().includes("rain")) {
        animationData = rainAnimation;
    } else if (
        weatherCondition.toLowerCase().includes("cloud") ||
        weatherCondition.toLowerCase().includes("overcast")
    ) {
        animationData = cloudsAnimation;
    } else if (
        weatherCondition.toLowerCase().includes("sunny") ||
        weatherCondition.toLowerCase().includes("clear")
    ) {
        animationData = sunAnimation;
    }

    return (
        <div style={{ width: 200, height: 200 }}>
            <Lottie animationData={animationData} loop={true} />
        </div>
    );
}

export default WeatherAnimation;
