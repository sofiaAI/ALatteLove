import React, { useState, useEffect } from "react";
import SingleReview from "./SingleReview.js";
import CommentsBlock from "./CommentsBlock.js";
import { get } from "../../utilities";

import "./ReviewCard.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
const ReviewCard = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    get("/api/comment", { parent: props._id }).then((comments) => {
      setComments(comments);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  return (
    <div className="Card-container">
      <SingleReview
        _id={props._id}
        creator_id={props.creator_id}
        coffee_shop= {props.coffee_shop}
        drink= {props.drink}
        price= {props.price}
        wait_time= {props.wait_time}
        taste= {props.taste}
        vibes= {props.vibes}
        location= {props.location} 
        internet= {props.internet}
        notes= {props.notes}
      />
      <CommentsBlock
        review={props}
        comments={comments}
        creator_id={props.creator_id}
        user={props.user}
        addNewComment={addNewComment}
      />
    </div>
  );
};

export default ReviewCard;