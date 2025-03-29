import React from "react";
import { Link } from "react-router-dom";

import PlacePhoto from "./PlacePhoto";

const Hotels = ({ trip }) => {
  return (
    <>
      <div>
        <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-12  my-7">
          {trip?.tripData?.hotels?.map((hotel, index) => (
            <Link
              key={index}
              to={
                "https://www.google.com/maps/search/?api=1&query=" +
                hotel?.hotel_name +
                "," +
                hotel?.hotel_address
              }
              target="_blank"
            >
              <div
                key={index}
                className="hover:scale-105 transition-all  cursor-pointer "
              >
                {/* <img src="/placeholder.jpg" className="rounded-xl" /> */}
                {/* <PlaceSearch query={hotel?.hotel_name}/> */}
                <PlacePhoto query={hotel?.hotel_name} />
                <div className="my-3 flex flex-col">
                  <h2 className="font-medium">{hotel?.hotel_name}</h2>
                  <h2 className="font-xs text-gray-500">
                    {hotel?.hotel_address}
                  </h2>
                  <h2 className="font-sm ">
                    Rs. {hotel?.price_per_night} per night
                  </h2>
                  <h2 className="font-sm "> ⭐ {hotel?.rating} stars</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hotels;
