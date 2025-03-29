import React, { useEffect, useState } from "react";

const PlacePhoto = ({ query }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (!window.google || !query) return;

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      query: query,
      fields: ["photos"],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results[0]?.photos
      ) {
        const url = results[0].photos[0].getUrl({
          maxWidth: 400,
          maxHeight: 300,
        });
        setPhotoUrl(url);
      }
    });
  }, [query]);

  return (
    <img
      src={photoUrl || "/placeholder.jpg"}
      alt={query}
      className="w-full h-48 object-cover"
    />
  );
};

export default PlacePhoto;
