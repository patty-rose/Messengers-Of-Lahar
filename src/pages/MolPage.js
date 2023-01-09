import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const MolPage = (props) => {
  const { listOfPages, onGetRandomPageId } = props;
  const { pageId } = useParams();
  const navigate = useNavigate();

  const thisPage = listOfPages.find((page) => page.id === pageId);

  console.log(onGetRandomPageId(listOfPages));

  const idClick = (pageArr) => {
    console.log(onGetRandomPageId(pageArr))
  }

  return (
    <div className="container main">
      <p>{thisPage.pageText}</p>
      <p>{thisPage.backgroundImage}</p>
      <Button onClick={()=>{idClick(listOfPages)}}> CLICK FOR ID </Button>

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
  onGetRandomPageId: PropTypes.func
};

export default MolPage;
