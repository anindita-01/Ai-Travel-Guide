import React, { useEffect, useState } from "react";
import { AI_PROMPT, SelectTravelsList } from "@/constants/Options";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions } from "@/constants/Options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const libraries = ["places"];

const CreateTrip = () => {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.no_of_days > 10) {
      toast("Maximum 10 days allowed.");
    }
    if (
      (!formData?.no_of_days && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all the details.");

      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{days}", formData?.no_of_days)
      .replace("{people}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{days}", formData?.no_of_days);

    // console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);
    saveAiTrip(result?.response?.text());
  };

  const saveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/'+docId);

  };

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place2 = autocomplete.getPlace();
      // console.log("Selected Place:", place);
      if (place2.geometry) {
        map.panTo(place2.geometry.location);
        handleInputChange("location", place2.formatted_address || place2.name);
      }
    }
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <>
      <div className="sm:p-10 md:p-32 lg:p-56 xl:p-30 px-5 mt-10 ">
        <h2 className="font-bold text-center text-3xl">
          Tell us what you prefer 🌴 🏖️
        </h2>
        <p className="mt-3 text-xl text-center text-gray-500">
          Just fill in some basic information and our planner will generate your
          customised plan for you!
        </p>

        <div className="mt-20 flex flex-col gap-9">
          <div>
            <h2 className="text-xl font-medium my-3">
              What is your destination?✈️
            </h2>

            <LoadScript
              googleMapsApiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              libraries={libraries}
            >
              <GoogleMap
                onLoad={setMap}
                mapContainerStyle={{ width: "100%", height: "400px" }}
                center={{ lat: 37.7749, lng: -122.4194 }}
                zoom={12}
              >
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <input
                    type="text"
                    placeholder="Search Places..."
                    className=""
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      width: "240px",
                      height: "40px",
                      padding: "0 12px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      fontSize: "16px",
                    }}
                    // onChange={(e) => {
                    //   handleInputChange("location",e.target.value);
                    // }}
                  />
                </Autocomplete>
              </GoogleMap>
            </LoadScript>
          </div>

          <div>
            <h2 className="text-xl font-medium my-3">
              How many days are you planning the trip for?
            </h2>
            <Input
              placeholder={"Ex. 4"}
              type="number"
              onChange={(e) => {
                handleInputChange("no_of_days", e.target.value);
              }}
            />
          </div>

          <div>
            <h2 className="text-xl font-medium my-3">What is your budget?💰</h2>
            <div className="grid grid-cols-3 mt-5 gap-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    handleInputChange("budget", item.title);
                  }}
                  className={`p-4 border round-lg hover:shadow-lg cursor-pointer ${
                    formData?.budget == item.title && "shadow-lg border-black"
                  }`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium my-3">
              Who do you plan to travel with?
            </h2>
            <div className="grid grid-cols-3 mt-5 gap-5">
              {SelectTravelsList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleInputChange("traveler", item.people);
                  }}
                  className={`p-4 border round-lg hover:shadow-lg cursor-pointer ${
                    formData?.traveler == item.people &&
                    "shadow-lg border-black"
                  }`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 flex justify-center">
        <Button onClick={onGenerateTrip} disabled={loading}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Create my trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <span className=" text-3xl font-bold text-lg  mt-7">
                Sign In with Google
              </span>
              <span>
                Sign in to the app with Google Authentication securely!
              </span>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTrip;
