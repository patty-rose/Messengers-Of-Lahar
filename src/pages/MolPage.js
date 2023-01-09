import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const MolPage = (props) => {
  const { pageId } = useParams();
  const navigate = useNavigate();

  const thisPage = props.listOfPages.find((page) => page.id === pageId);

  return (
    <div className="container main">
      <p>{thisPage.pageText}</p>
      <p>{thisPage.backgroundImage}</p>

      <Link to="/admin/dashboard" style={{ textDecoration: "none", color: "#4F5361" }}>
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
  )
};

MolPage.propTypes = {
  listOfPages: PropTypes.array,
};

export default MolPage;
