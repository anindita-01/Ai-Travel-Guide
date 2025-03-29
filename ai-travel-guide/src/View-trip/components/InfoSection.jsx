import { Button } from "@/components/ui/button";

import React, { useEffect } from "react";
import { IoIosSend } from "react-icons/io";

import PlacePhoto from "./PlacePhoto";

const InfoSection = ({ trip }) => {
  return (
    <>
      <div className="w-full h-full rounded-xl object-cover overflow-hidden">
        <PlacePhoto query={trip?.userSelection?.location} />
        <div className="flex justify-between items-center">
          <div className="my-5 flex flex-col gap-2">
            <h2 className="font-bold text-2xl">
              {trip?.userSelection?.location}
            </h2>
            <div className="flex gap-5">
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                {trip?.userSelection?.no_of_days} Day
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                {trip?.userSelection?.budget} budget
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                No of traveler: {trip?.userSelection?.traveler}
              </h2>
            </div>
          </div>
          <Button>
            <IoIosSend />
          </Button>
        </div>
      </div>
    </>
  );
};

export default InfoSection;
