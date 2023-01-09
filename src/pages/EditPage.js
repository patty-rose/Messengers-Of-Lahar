import React from "react";
import PropTypes from "prop-types";

function EditPage(props) {
  const { page } = props;

  function handleEditPageSubmission(event) {
    event.preventDefault();
    props.onEditPage({
      pageText: event.target.pageText.value,
      backgroundImage: event.target.backgroundImage.value,
      id: page.id,
    });
  }

  return (
    <React.Fragment>
        <form onSubmit={handleEditPageSubmission}>
        <label>text to display on page</label>
        <input
          type='text'
          name='pageText'
          defaultValue='text to display on page' />
        <label>Background Image URL</label>
        <input
          type='text'
          name='backgroundImage'
          defaultValue='Background Image URL' />
        <button type='submit'>Edit</button>
      </form>
    </React.Fragment>
  );
}

EditPage.propTypes = {
  onEditPage: PropTypes.func,
  page: PropTypes.object,
};

export default EditPage;
