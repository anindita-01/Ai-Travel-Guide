import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold mt-16 w-full  text-[50px] mx-10 text-center">
        <span className="text-red-600 !important">
          Dive in Your Next Adventure with AI
        </span>
        <br></br> Your Own Travel Itinerary{" "}
      </h1>
      <p className="text-3xl text-center text-gray-500">
        Let AI craft your perfect travel experience—personalized itineraries,
        smart recommendations, and stress-free planning, all in one place!{" "}
      </p>
      <Link to={"/create-trip"}>
        <Button>Get Started Now</Button>
      </Link>
      <img src="/landing_page.png" className="py-10 mt-20 h-[800px] w-full"/>
    </div>
  );
};

export default Hero;
