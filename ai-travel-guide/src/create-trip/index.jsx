import React, {useEffect,useState } from "react";
import { SelectTravelsList } from "@/constants/Options";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions } from "@/constants/Options";
import { Button } from "@/components/ui/button";

const libraries = ["places"];

const CreateTrip = () => {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {



    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const onGenerateTrip =()=>{
    if(formData?.no_of_days>10){
      alert("Maximum 10 days allowed");
      return;
    }
    console.log(formData);
  }

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      // console.log("Selected Place:", place);
      if (place.geometry) {
        map.panTo(place.geometry.location);
        handleInputChange("location", place.formatted_address || place.name); 
      }
    }
  };

  return (
    <>
      <div className="sm:p-10 md:p-32 lg:p-56 xl:p-10 px-5 mt-10 ">
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
                  onClick={(e)=>{
                    e.stopPropagation(); // Prevent event bubbling
                    handleInputChange('budget',item.title)
                  }}
                  className={`p-4 border round-lg hover:shadow-lg cursor-pointer ${formData?.budget==item.title&&'shadow-lg border-black'}`}
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
                  onClick={()=>{
                    handleInputChange('traveler',item.people)
                  }}
                  className={`p-4 border round-lg hover:shadow-lg cursor-pointer ${formData?.traveler==item.people&&'shadow-lg border-black'}`}
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
        <Button onClick={onGenerateTrip}>Create my trip</Button>
      </div>
    </>
  );
};

export default CreateTrip;
