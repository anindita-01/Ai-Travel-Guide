// import { Button } from '@/components/ui/button';
import React from "react";
import { Link } from "react-router-dom";

import PlacePhoto from "./PlacePhoto";
// import { FaMapLocationDot } from "react-icons/fa6";

const PlacesToVisit = ({ trip }) => {
  return (
    <>
      <h2 className="font-bold text-xl mt-5">Places to Visit</h2>

      <div className="my-40 grid w-full xl:grid-cols-3 gap-7 md:grid-cols-2 sm:grid-cols-1 ">
        {trip?.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary)
            .sort((a, b) => {
              const dayA = parseInt(a[0].replace("day", ""));
              const dayB = parseInt(b[0].replace("day", ""));
              return dayA - dayB;
            })
            .map(([day, details], index) => (
              <div key={index} className="border rounded-xl p-4 shadow-md">
                <h3 className="text-lg font-semibold mb-2 capitalize">
                  {day} - {details.theme}
                </h3>
                <p className="text-gray-500 mb-3">
                  Best Time to Visit: {details.best_time_to_visit}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 hover:scale-100">
                  {details.activities.map((activity, idx) => (
                    <Link
                      key={idx}
                      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        activity.place_name
                      )}`}
                      target="_blank"
                      className="hover:border-black transition-all cursor-pointer"
                    >
                      <div
                        key={idx}
                        className="border rounded-lg overflow-hidden shadow-sm hover:border-black hover:shadow-black w-full object-cover transition-all"
                      >
                        {/* <img
                          src="/placeholder.jpg"
                          alt={activity.place_name}
                          className="w-full h-48 object-cover"
                        /> */}
                        <PlacePhoto query={activity.place_name} />

                        <div className="p-3 flex flex-col gap-2">
                          <h4 className="font-medium">{activity.place_name}</h4>
                          <p className="text-gray-500 text-sm">
                            {activity.place_details}
                          </p>
                          <p className="text-sm">
                            ⭐ {activity.rating} | 🎟️ {activity.ticket_pricing}
                          </p>
                          <p className="text-sm">
                            🕒 Best Time: {activity.best_time_to_visit}
                          </p>
                          <p className="text-sm">
                            🚗 {activity.time_to_travel}
                          </p>
                          {/* <Button className='h-7 w-7'><FaMapLocationDot /></Button> */}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default PlacesToVisit;
