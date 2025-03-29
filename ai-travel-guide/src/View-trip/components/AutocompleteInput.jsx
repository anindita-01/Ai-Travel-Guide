import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

const AutocompleteInput = ({ onPlaceSelected }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_PLACE_API_KEY
        }&libraries=places`;
        script.async = true;
        script.onload = initAutocomplete;
        document.body.appendChild(script);
      } else {
        initAutocomplete();
      }
    };

    const initAutocomplete = () => {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current
      );
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        onPlaceSelected(place);
      });
    };

    loadGoogleMaps();
  }, []);

  return (
    <Input ref={inputRef} placeholder="Search Destination" className="w-full" />
  );
};

export default AutocompleteInput;
