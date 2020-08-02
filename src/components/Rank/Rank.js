import React from "react";

export const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className="white f3">{`${name}, your current entry count...`}</div>
            <div className="white f1">{entries}</div>
        </div>
    );
};
