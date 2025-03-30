import PlacePhoto from "@/View-trip/components/PlacePhoto";
import React from "react";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
  return (
    <>
      <Link to={"/view-trip/" + trip?.id}>
        <div className="hover:scale-105 transition-all hover:shadow-lg ">
          {/* <img src='/placeholder.jpg' className='object-cover rounded-xl'/> */}
          <PlacePhoto
            query={trip?.userSelection?.location}
            className="object-cover rounded-xl h-[220px]"
          />
          <div>
            <h2 className="font-bold text-lg">
              {trip?.userSelection?.location}
            </h2>
            <h2 className="text-sm text-gray-500">
              {trip?.userSelection?.no_of_days} days trip with{" "}
              {trip?.userSelection?.budget} budget
            </h2>
          </div>
        </div>
      </Link>
    </>
  );
};

export default UserTripCardItem;
