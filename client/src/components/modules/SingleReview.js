import React from "react";
import { Link } from "@reach/router";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
const SingleReview = (props) => {
  return (
    <div className="Card-story">
      {/* <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
        {props.creator_name}
      </Link> */}
      <div className="Card-storyContent"><h1>{props.coffee_shop}</h1></div>
      <div className="Card-storyContent">Drink: {props.drink}</div>
      <div className="Card-storyContent">Price: ${props.price}</div>
      <div className="Card-storyContent">Wait Time: {props.wait_time} mins</div>
      <div className="Card-storyContent">Taste: {props.taste}</div>
      <div className="Card-storyContent">Vibes: {props.vibes}</div>
      <div className="Card-storyContent">Location: {props.location}</div>
      <div className="Card-storyContent">Internet {props.internet}</div>
      <div className="Card-storyContent">Notes: {props.notes}</div>
    </div>
  );
};

export default SingleReview;