import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

const MyTrips = () => {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);
  useEffect(() => {
    GetUserTrips();
  }, []);

  // used to get all user trips
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigation("/");
      return;
    }
    setUserTrips([]);
    const q = query(
      collection(db, "AiTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);

    const trips = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      // setUserTrips((prevVal) => [...prevVal, doc.data()]);
      trips.push(doc.data());
    });
    setUserTrips(trips);
  };

  return (
    <>
      <div className="sm:p-10 md:p-32 lg:p-40 xl:p-30 px-5 mt-5 ">
        <h2 className="font-bold text-center text-3xl">My Trips</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-12  my-7 ">
          {userTrips?.length > 0
            ? userTrips.map((trip, index) => (
                <UserTripCardItem trip={trip} key={index} />
              ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
                ></div>
              ))}
        </div>
      </div>
    </>
  );
};

export default MyTrips;
