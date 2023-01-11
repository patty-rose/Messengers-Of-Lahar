import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";

const MolPage = (props) => {
  const { listOfPages, onGetRandomPageId } = props;
  const { pageId } = useParams();

  const thisPage = listOfPages.find((page) => page.id === pageId);

  const randomPageId = onGetRandomPageId(listOfPages);

  const molPageStyle = {
    backgroundImage: `url('${thisPage.backgroundImage}')`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="container" style={molPageStyle}>
      <p>{thisPage.pageText}</p>
      <p>{thisPage.backgroundImage}</p>

      <Link
        to={`/${randomPageId}`}
        style={{ textDecoration: "none", color: "#4F5361" }}
      >
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          link left
        </Typography>
      </Link>

      <Link
        to={`/${randomPageId}`}
        style={{ textDecoration: "none", color: "#4F5361" }}
      >
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          link right
        </Typography>
      </Link>
    </div>
  );
};

MolPage.propTypes = {
  listOfPages: PropTypes.array,
  onGetRandomPageId: PropTypes.func,
};

export default MolPage;
