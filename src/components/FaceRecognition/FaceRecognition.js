import React from "react";
import "./FaceRecognition.css";

export const FaceRecognition = ({ image, box }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img
                    id="input"
                    alt=""
                    src={image}
                    width="500px"
                    height="auto"
                />
                <div
                    className="bounding-box"
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol,
                    }}
                ></div>
            </div>
        </div>
    );
};
