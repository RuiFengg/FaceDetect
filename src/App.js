import React from "react";
import "./App.css";
import { Navigation } from "./components/Navigation/Navigation";
import { FaceRecognition } from "./components/FaceRecognition/FaceRecognition";
import { Logo } from "./components/Logo/Logo";
import { ImageLinkForm } from "./components/ImageLinkForm/ImageLinkForm";
import { Rank } from "./components/Rank/Rank";
import { SignIn } from "./components/SignIn/SignIn";
import { Register } from "./components/Register/Register";
import Particles from "react-particles-js";

function App() {
  const [input, setInput] = React.useState("");
  const [image, setImage] = React.useState("");
  const [box, setBox] = React.useState({});
  const [route, setRoute] = React.useState("signin");
  const [isSignedIn, setSignedIn] = React.useState(false);
  const [user, setUser] = React.useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  React.useEffect(() => {
    fetch("https://blooming-mesa-49900.herokuapp.com")
      .then((response) => response.json())
      .then(console.log);
  }, []);

  const loadUser = (data) => {
    console.log(data);
    setUser({
      ...user,
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

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
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onSignOut = () => {
    setImage("");
    onRouteChange("signout");
  };

  const onSubmit = () => {
    setImage(input);
    fetch("https://blooming-mesa-49900.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://blooming-mesa-49900.herokuapp.com:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser({ ...user, entries: count });
            });
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setSignedIn(false);
    } else if (route === "home") {
      setSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation
        onSignOut={onSignOut}
        isSignedIn={isSignedIn}
        onRouteChange={onRouteChange}
      />
      {route === "home" ? (
        <div>
          <Logo />

          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition box={box} image={image} />
        </div>
      ) : route === "signin" ? (
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
