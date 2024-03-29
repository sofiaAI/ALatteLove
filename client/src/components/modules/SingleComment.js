import React from "react";
import { Link } from "@reach/router";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the comment
 */
const SingleComment = (props) => {
  return (
    <div className="Card-commentBody">
        {props.creator_name}
      <span>{" | " + props.content}</span>
    </div>
  );
};

export default SingleComment;