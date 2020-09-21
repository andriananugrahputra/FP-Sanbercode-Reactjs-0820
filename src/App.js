import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./config";
import { Footer, Navbar } from "./layouts";
import Routes from "./Routes";

function App() {
  return (
    <Router>
      <UserProvider>
        <div
          style={{
            position: "relative",
            margin: "0 auto",
            backgroundColor: "grey",
            backgroundImage:
              "url(https://www.wallpapers4u.org/wp-content/uploads/surface_dark_background_texture_50754_1920x1080.jpg)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100%",
          }}
        >
          <Navbar />
          <Routes />
          <Footer />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
