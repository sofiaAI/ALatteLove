import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { get, post } from "../../utilities";
import ReviewCard from "../modules/ReviewCard.js";
import { NewReview } from "../modules/NewReviewInput.js";
import "./Home.css";
import Sound from 'react-sound';
const GOOGLE_CLIENT_ID = "625746495450-auuj35v2kasflktfuuui5n9c9ck134o9.apps.googleusercontent.com";

const Home = ({ user, handleLogin, handleLogout }) => {
  const [reviews, setReviews] = useState([]);
  const [showReview, setShowReview] = useState(false)
  useEffect(() => {
    get("/api/reviews").then((reviewObjs) => {
      console.log(reviewObjs)
      // let reversedReviewObjs = reviewObjs.reverse();
      setReviews(reviewObjs);
    });
  }, []);

  const addNewReview = (reviewObj) => {
    setReviews([reviewObj].concat(reviews));
  };

  const [isPlaying, setIsPlaying] = useState(false);

  let reviewsList = null;
  const hasReviews = reviews.length !== 0;
  if (hasReviews) {
    reviewsList = reviews.map((reviewObj) => (
      <ReviewCard
        user = {user}
        key={`ReviewCard_${reviewObj._id}`}
        _id={reviewObj._id}
        creator_id= {reviewObj.creator_id}
        coffee_shop= {reviewObj.coffee_shop}
        drink= {reviewObj.drink}
        price= {reviewObj.price}
        wait_time= {reviewObj.wait_time}
        taste= {reviewObj.taste}
        vibes= {reviewObj.vibes}
        location= {reviewObj.location} 
        internet= {reviewObj.internet}
        notes= {reviewObj.notes}
      /> 
    ));
  } else {
    reviewsList = <div>No Reviews Found</div>;
  }

  return (
    <>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {user ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
      )}
    </GoogleOAuthProvider>
    {user ? (
      <> 
     <div><h1> {"<3 " + user.name + " <3"}  </h1></div>
        <Sound url = {require("./DoomerJazz.mp3").default}
        playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
        loop = {true}>
        </Sound>
        <button
          onClick={() => {
            setIsPlaying(!isPlaying);
          }}
        >
          {!isPlaying ? 'Play' : 'Stop'}
        </button>
        <button 
              onClick={() => setShowReview(!showReview)} 
              className={"btn " + (showReview && " show-review")}>
            Toggle Show
        </button>
        { showReview ? (<NewReview addNewReview={addNewReview} />): (<></>)}
        {reviewsList}
     </>
    ) : (
      <p>Logged Out</p>
    )} 
    </>
  );
};

export default Home;
