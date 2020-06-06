import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import brain from "./brain.png";

export const Logo = () => {
    return (
        <div className="ma4-mt0">
            <Tilt
                className="Tilt br2 shadow-2"
                options={{ max: 55 }}
                style={{ height: 150, width: 150, marginLeft: 20 }}
            >
                <div className="Tilt-inner">
                    <img
                        width="70%"
                        style={{ paddingTop: "20px" }}
                        alt="logo"
                        src={brain}
                    />
                </div>
            </Tilt>
        </div>
    );
};
