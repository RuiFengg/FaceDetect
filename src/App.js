import React from "react";
import "./App.css";
import { Navigation } from "./components/Navigation/Navigation";
import { FaceRecognition } from "./components/FaceRecognition/FaceRecognition";
import { Logo } from "./components/Logo/Logo";
import { ImageLinkForm } from "./components/ImageLinkForm/ImageLinkForm";
import { Rank } from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

function App() {
    const [input, setInput] = React.useState("");
    const [image, setImage] = React.useState("");
    const [box, setBox] = React.useState({});

    const calculateFaceLocation = (data) => {
        const clarifaiFace =
            data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById("input");
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - clarifaiFace.right_col * width,
            bottomRow: height - clarifaiFace.bottom_row * height,
        };
    };

    const displayFaceBox = (box) => {
        console.log(box);
        setBox(box);
    };

    const particlesOptions = {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800,
                },
            },
        },
    };
    const app = new Clarifai.App({
        apiKey: "0c8a5d6939344269838e5f2a28acdcc5",
    });
    const onInputChange = (event) => {
        setInput(event.target.value);
    };
    const onSubmit = () => {
        setImage(input);
        app.models
            .predict(Clarifai.FACE_DETECT_MODEL, input)
            .then((response) => displayFaceBox(calculateFaceLocation(response)))
            .catch((err) => console.log(err));
    };
    return (
        <div className="App">
            <Particles className="particles" params={particlesOptions} />
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
            <FaceRecognition box={box} image={image} />
        </div>
    );
}

export default App;
