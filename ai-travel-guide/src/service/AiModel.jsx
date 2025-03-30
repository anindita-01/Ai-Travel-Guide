// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,

//   } = require("@google/generative-ai");

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "node:fs";
import mime from "mime-types";

//   const fs = require("node:fs");
//   const mime = require("mime-types");

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a travel plan for location: Las Vegas, for 3 days for couple with a cheap budget, give me a hotels opinion list with hotel name, hotel address, price, ratings, hotel image url, geo coordinates, description and suggest itinerary with place name, place details, place image url, geo coordinates, ticket pricing, rating,  time to travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'Okay, here\'s a budget-friendly 3-day Las Vegas itinerary for a couple, presented in JSON format, along with hotel options and activity suggestions.  I\'ve focused on free and low-cost activities, and economical hotel choices.\n\n```json\n{\n  "trip_name": "Las Vegas Budget Getaway for Couples",\n  "duration": "3 days",\n  "budget": "Cheap/Economical",\n  "travelers": "Couple",\n  "currency": "USD",\n  "hotels": [\n    {\n      "hotel_name": "Circus Circus Hotel & Casino",\n      "hotel_address": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price_per_night": 40,\n      "rating": 3.5,\n      "hotel_image_url": "https://www.kayak.com/rimg/himg/3c/8c/0f/ice-31120-7506803-590493.jpg?width=720&height=576&crop=true",\n      "geo_coordinates": {\n        "latitude": 36.1262,\n        "longitude": -115.1647\n      },\n      "description": "A classic Vegas hotel with affordable rates, a circus theme, and the Adventuredome indoor amusement park.  Expect crowds and basic amenities, but it\'s a great budget option. Free Circus act available.",\n       "amenities": [\n        "Pool",\n        "Casino",\n        "Restaurants",\n        "Adventuredome Theme Park",\n        "Free Circus Acts"\n      ]\n    },\n    {\n      "hotel_name": "Strat Hotel, Casino & Skypod",\n      "hotel_address": "2000 S Las Vegas Blvd, Las Vegas, NV 89104",\n      "price_per_night": 55,\n      "rating": 3.7,\n      "hotel_image_url": "https://www.kayak.com/rimg/himg/ec/53/7b/ice-23068-7321915-774425.jpg?width=720&height=576&crop=true",\n      "geo_coordinates": {\n        "latitude": 36.1464,\n        "longitude": -115.1552\n      },\n      "description": "Located at the north end of the Strip, the Strat offers stunning views from its Skypod (observation deck).  Rooms are generally affordable, and the location provides a different perspective on Vegas. Be aware that it\'s a longer walk to the main action on the Strip.",\n      "amenities": [\n        "Pool",\n        "Casino",\n        "Skypod Observation Deck",\n        "Thrill Rides",\n        "Restaurants"\n      ]\n    },\n    {\n      "hotel_name": "Excalibur Hotel & Casino",\n      "hotel_address": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price_per_night": 60,\n      "rating": 4.0,\n      "hotel_image_url": "https://www.kayak.com/rimg/himg/51/72/a3/ice-12127-55555418-029265.jpg?width=720&height=576&crop=true",\n      "geo_coordinates": {\n        "latitude": 36.0984,\n        "longitude": -115.1744\n      },\n      "description": "A medieval-themed hotel offering budget-friendly rooms and a central Strip location.  It\'s connected to Luxor and Mandalay Bay by free trams, making it easy to explore other properties. Great for family as well.",\n       "amenities": [\n        "Pool",\n        "Casino",\n        "Restaurants",\n        "Tournament of Kings Dinner Show",\n        "Free Tram Access to Luxor and Mandalay Bay"\n      ]\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "theme": "South Strip Exploration and Free Shows",\n      "best_time_to_visit": "Afternoon and Evening",\n      "activities": [\n        {\n          "place_name": "Welcome to Fabulous Las Vegas Sign",\n          "place_details": "Iconic sign, great for photos.  Expect a line during peak hours.",\n          "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Las_Vegas_Welcome_Sign_at_Night.jpg/1280px-Las_Vegas_Welcome_Sign_at_Night.jpg",\n          "geo_coordinates": {\n            "latitude": 36.0826,\n            "longitude": -115.1727\n          },\n          "ticket_pricing": "Free",\n          "rating": 4.5,\n          "time_to_travel": "20 minutes drive from the Strip (depending on traffic)",\n          "best_time_to_visit": "Morning for better lighting and fewer crowds"\n        },\n        {\n          "place_name": "Bellagio Conservatory & Botanical Garden",\n          "place_details": "Beautiful seasonal displays, free to enter.",\n          "place_image_url": "https://www.bellagio.com/content/dam/MGM/bellagio/entertainment/conservatory-botanical-garden/Bellagio_Conservatory_Chinese_New_Year_2024_Hero_4800x2700.jpg",\n          "geo_coordinates": {\n            "latitude": 36.1126,\n            "longitude": -115.1743\n          },\n          "ticket_pricing": "Free",\n          "rating": 4.8,\n          "time_to_travel": "Walking distance on the Strip.",\n          "best_time_to_visit": "Anytime, but expect crowds during the day"\n        },\n        {\n          "place_name": "Bellagio Fountain Show",\n          "place_details": "Spectacular water show set to music.",\n          "place_image_url": "https://www.bellagio.com/content/dam/MGM/bellagio/entertainment/fountains-of-bellagio/fountains-of-bellagio-night-hero-1440x600.jpg",\n          "geo_coordinates": {\n            "latitude": 36.1126,\n            "longitude": -115.1743\n          },\n          "ticket_pricing": "Free",\n          "rating": 4.7,\n          "time_to_travel": "Walking distance on the Strip.",\n          "show_times": "Every 30 minutes in the afternoon and early evening; every 15 minutes from 8 PM to midnight.",\n           "best_time_to_visit": "Evening for the lights"\n        },\n        {\n          "place_name": "Walk the Las Vegas Strip",\n          "place_details": "Experience the sights and sounds of the Strip.  Enjoy window shopping and people-watching.",\n          "place_image_url": "https://i.insider.com/6393973793c863001bbbb366?width=1200&format=jpeg",\n          "geo_coordinates": {\n             "latitude": 36.1146,\n            "longitude": -115.1728\n          },\n          "ticket_pricing": "Free",\n          "rating": 4.2,\n          "time_to_travel": "As long as you want!",\n          "best_time_to_visit": "Evening, when the lights are on"\n        },\n         {\n          "place_name": "The LINQ Promenade & High Roller (Optional)",\n          "place_details": "Outdoor shopping, dining, and entertainment district. The High Roller observation wheel offers amazing views (ticketed).",\n          "place_image_url": "https://www.caesars.com/content/dam/linq/things-to-do/high-roller/overview/linq-high-roller-exterior-night-1280x640.jpg",\n          "geo_coordinates": {\n            "latitude": 36.1163,\n            "longitude": -115.1692\n          },\n          "ticket_pricing": "High Roller: ~$37-52 per person",\n          "rating": 4.3,\n          "time_to_travel": "Walking distance on the Strip",\n          "best_time_to_visit": "Evening, especially to ride the High Roller at night",\n           "optional": true\n        }\n      ]\n    },\n    "day2": {\n      "theme": "Downtown Las Vegas and Historical Sites",\n      "best_time_to_visit": "Daytime for exploring; evening for Fremont Street Experience.",\n      "activities": [\n        {\n          "place_name": "Fremont Street Experience",\n          "place_details": "Light and sound show on a canopy screen.  Free entertainment.",\n          "place_image_url": "https://fremontstreetexperience.com/wp-content/uploads/2023/08/fse-homepage-image-1.jpg",\n          "geo_coordinates": {\n            "latitude": 36.1703,\n            "longitude": -115.1421\n          },\n          "ticket_pricing": "Free",\n          "rating": 4.6,\n          "time_to_travel": "About 20-30 minutes drive from the Strip (depending on traffic); consider using the Deuce bus.",\n          "show_times": "Shows typically start in the evening and run hourly.",\n          "best_time_to_visit": "Evening for the Viva Vision light shows"\n        },\n        {\n          "place_name": "Downtown Container Park",\n          "place_details": "Unique shopping and dining area built from shipping containers.",\n          "place_image_url": "https://downtowncontainerpark.com/wp-content/uploads/2023/06/container-park-downtown-las-vegas-family-friendly.jpg",\n          "geo_coordinates": {\n            "latitude": 36.1688,\n            "longitude": -115.1406\n          },\n          "ticket_pricing": "Free to enter (prices vary for food and activities inside)",\n          "rating": 4.2,\n          "time_to_travel": "Walking distance from Fremont Street.",\n          "best_time_to_visit": "Afternoon or evening"\n        },\n        {\n          "place_name": "Gold and Silver Pawn Shop (Pawn Stars)",\n          "place_details": "Famous pawn shop from the TV show.  Expect crowds.",\n          "place_image_url": "https://s.abcnews.com/images/Business/pawn-stars-gty-er-170126_16x9_992.jpg",\n          "geo_coordinates": {\n            "latitude": 36.1797,\n            "longitude": -115.1423\n          },\n          "ticket_pricing": "Free to enter",\n          "rating": 3.8,\n          "time_to_travel": "Short drive or bus ride from Fremont Street.",\n          "best_time_to_visit": "During the day, but be prepared for potential lines."\n        },\n        {\n          "place_name": "Mob Museum",\n          "place_details": "Museum about the history of organized crime (ticketed).",\n          "place_image_url": "https://themobmuseum.org/wp-content/uploads/2022/11/about_section_1-1024x683.jpg",\n          "geo_coordinates": {\n            "latitude": 36.1674,\n            "longitude": -115.1474\n          },\n          "ticket_pricing": "$29.95 per person (check for discounts online)",\n          "rating": 4.7,\n          "time_to_travel": "Walking distance from Fremont Street",\n          "best_time_to_visit": "During the day",\n          "optional": true\n        }\n      ]\n    },\n    "day3": {\n      "theme": "Ethel M Chocolate Factory and seven magic mountain",\n      "best_time_to_visit": "Daytime",\n      "activities": [\n         {\n          "place_name": "Ethel M Chocolate Factory and Cactus Garden",\n          "place_details": "Free chocolate factory tour and beautiful cactus garden. Great for a relaxing morning.",\n          "place_image_url": "https://www.8newsnow.com/wp-content/uploads/sites/59/2023/11/Cactus-Garden-Lights-at-Ethel-M-Chocolates.jpg?strip=all&quality=90&w=1200&h=800&crop=1",\n          "geo_coordinates": {\n            "latitude": 36.0462,\n            "longitude": -115.0405\n          },\n          "ticket_pricing": "Free (chocolate samples might tempt you to buy!)",\n          "rating": 4.5,\n          "time_to_travel": "About a 20-minute drive from the Strip.",\n          "best_time_to_visit": "Morning or early afternoon"\n        },\n        {\n          "place_name": "Seven Magic Mountains",\n          "place_details": "Colorful stacked boulder art installation in the desert.",\n          "place_image_url": "https://sevenmagicmountains.com/wp-content/uploads/2016/04/SevenMagicMountains_InstallationView_03.jpg",\n          "geo_coordinates": {\n            "latitude": 35.9564,\n            "longitude": -115.2564\n          },\n          "ticket_pricing": "Free",\n          "rating": 4.3,\n          "time_to_travel": "About a 30-40 minute drive from the Strip (south on I-15).",\n          "best_time_to_visit": "Morning or late afternoon to avoid the heat and get good lighting for photos."\n        },\n        {\n          "place_name": "Hoover Dam (Optional)",\n          "place_details": "Impressive engineering marvel.  Requires a longer drive.",\n          "place_image_url": "https://www.usbr.gov/lc/hooverdam/images/PHO-2021-00020.jpg",\n          "geo_coordinates": {\n            "latitude": 36.0162,\n            "longitude": -114.7372\n          },\n          "ticket_pricing": "$10 per vehicle for parking; tours are extra.",\n          "rating": 4.6,\n          "time_to_travel": "About a 45-minute to 1-hour drive from the Strip.",\n           "best_time_to_visit": "Morning to avoid crowds and the midday heat.",\n          "optional": true\n        }\n      ]\n    }\n  },\n  "transportation_notes": "Consider using ride-sharing services (Uber/Lyft) for short distances. The Deuce bus is a cost-effective option for traveling along the Strip and to Downtown. Walking is a great way to explore the Strip, but wear comfortable shoes!",\n  "food_notes": "Look for happy hour deals and affordable eateries.  Many casinos offer inexpensive food courts. Consider bringing snacks and drinks to save money.  Water is essential in the desert climate!",\n  "general_tips": [\n    "Stay hydrated!",\n    "Wear comfortable shoes.",\n    "Take advantage of free activities and attractions.",\n    "Look for deals and discounts online.",\n    "Set a budget and stick to it.",\n    "Tip service staff appropriately."\n  ]\n}\n```\n\n**Key Considerations for Budget Travelers:**\n\n*   **Transportation:**  Walking is your friend! Utilize the Deuce bus for longer distances. Avoid taxis; ride-sharing apps are generally cheaper.\n*   **Food:**  Happy hour deals are crucial.  Avoid high-end restaurants. Explore food courts in casinos.  Bring your own water and snacks.\n*   **Gambling:**  If you gamble, set a strict limit and stick to it.  Consider it entertainment money, not an investment.\n*   **Flexibility:** Be open to changing your plans based on deals and opportunities that arise.\n*   **Hotel Location:**  Consider hotels slightly off the main Strip for better prices.\n*   **Free Activities:** Las Vegas offers many free activities: Fountain shows, botanical gardens, street performers, etc.\n*   **Show Tickets:** Book shows in advance for better prices. Look for discount tickets at booths on the Strip (but be wary of timeshare pitches).\n\nThis JSON provides a comprehensive starting point for planning a memorable and affordable Las Vegas trip!  Remember to check prices and availability closer to your travel dates. Have fun!\n',
        },
      ],
    },
  ],
});

const result =  chatSession.sendMessage("INSERT_INPUT_HERE");
// TODO: Following code needs to be updated for client-side apps.
const candidates = result.response.candidates;
for (
  let candidate_index = 0;
  candidate_index < candidates.length;
  candidate_index++
) {
  for (
    let part_index = 0;
    part_index < candidates[candidate_index].content.parts.length;
    part_index++
  ) {
    const part = candidates[candidate_index].content.parts[part_index];
    if (part.inlineData) {
      try {
        const filename = `output_${candidate_index}_${part_index}.${mime.extension(
          part.inlineData.mimeType
        )}`;
        fs.writeFileSync(filename, Buffer.from(part.inlineData.data, "base64"));
        console.log(`Output written to: ${filename}`);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
