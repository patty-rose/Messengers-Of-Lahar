import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container main">
      <h1>Messengers of Lahar</h1>
      <p>
        Live your desires and reverse the shame thrust on you by those fearful
        of exploration
      </p>
      <Link to="/" style={{ textDecoration: "none", color: "#4F5361" }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          link left
        </Typography>
      </Link>
      <Link to="/" style={{ textDecoration: "none", color: "#4F5361" }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          link right
        </Typography>
      </Link>
    </div>
  );
};

export default Home;
