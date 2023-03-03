import React, { useState } from "react";

import "./NewReviewInput.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewReview = (props) => {
  const [value, setValue] = useState({ coffee_shop: "", drink: "", price: "", wait_time: '', 
                                        taste: '', vibes: '', location: '', internet: '', notes: ''});

  const placeholder_to_key = { 'Coffee Shop': "coffee_shop", 'Drink Ordered': "drink", 'Price (USD)': "price",
        'Wait Time (mins)': "wait_time", 'Taste (0-10)': "taste", 'Vibes (0-10)': "vibes", 
        'Location (0-10)': "location", 'Internet (0-10)': "internet", 'Notes': "notes"};

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    const val = event.target.value;
    const key =placeholder_to_key[event.target.placeholder]
    setValue({
        ...value,
        [key]: val,
      });
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    const body = { coffee_shop: value.coffee_shop, drink: value.drink, price: value.price, wait_time: value.wait_time, 
        taste: value.taste, vibes: value.vibes, location: value.location, internet: value.internet, notes: value.notes};

    post("/api/review", body).then((review) => {
    // display this story on the screen
    props.addNewReview(review);
    });
    console.log(body)
    setValue({...value, coffee_shop: "", drink: "", price: "", wait_time: '', 
    taste: '', vibes: '', location: '', internet: '', notes: ''});
  };

  return (
    <div className="v-flex">
      <input
        type="text"
        placeholder={'Coffee Shop'}
        value={value.coffee_shop}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <input
        type="text"
        placeholder={'Drink Ordered'}
        value={value.drink}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <input
        type="text"
        placeholder={'Price (USD)'}
        value={value.price}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <input
        type="text"
        placeholder={'Wait Time (mins)'}
        value={value.wait_time}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <input
        type="text"
        placeholder={'Taste (0-10)'}
        value={value.taste}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <input
        type="text"
        placeholder={'Vibes (0-10)'}
        value={value.vibes}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <input
        type="text"
        placeholder={'Location (0-10)'}
        value={value.location}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <input
        type="text"
        placeholder={'Internet (0-10)'}
        value={value.internet}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <input
        type="text"
        placeholder={'Notes'}
        value={value.notes}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId to add comment to
 */
const NewComment = (props) => {
    const [comment, setComment] = useState('');

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const addComment = () => {
        const body = { parent: props.reviewId, content: comment };
        post("/api/comment", body).then((newComment) => {
            // display this comment on the screen
            props.addNewComment(newComment);
        });
        setComment('');
    };

    return (
        <div className="v-flex">
        <input
            type="text"
            placeholder={'New Comment'}
            value={comment}
            onChange={handleChange}
            className="NewPostInput-input"
        />
        <button
            type="submit"
            className="NewPostInput-button u-pointer"
            value="Submit"
            onClick={addComment}>
            Submit
        </button>
        </div>
    );
};


export { NewReview , NewComment};