/* ------------------------------------------------------------------
   LOCATION ADVANTAGE DATA
   Each entry:
   {
     title: "Category",
     icon: "Font Awesome classes",
     items: [
       ["Place name", "Distance"]
     ]
   }
------------------------------------------------------------------ */

const locationData = [
  {
    title: "Transport & Connectivity",
    icon: "fa-solid fa-train-subway",
    items: [
      ["Kaloor Junction", "0 km"],
      ["Kaloor Metro Station", "0.225 km"],
      ["Ernakulam Town North Railway Station", "0.75 km"],
      ["MG Road Metro Station", "1.875 km"],
      ["High Court Boat Jetty", "1.875 – 2.25 km"],
      ["Ernakulam Junction (South)", "2.25 – 3 km"],
      ["Vyttila Mobility Hub", "3.75 – 4.5 km"],
      ["Cochin International Airport", "19.5 km"]
    ]
  },

  {
    title: "Temples",
    icon: "fa-solid fa-om",
    items: [
      ["Pavakulam Sree Mahadeva Temple", "0.15 km"],
      ["Shiva Temple, North Indian Charitable Trust", "0.75 km"],
      ["Cherathrikovil Temple", "0.75 – 1.125 km"],
      ["Ernakulathappan Temple", "1.875 – 2.25 km"],
      ["Sree Poornathrayeesa Temple, Tripunithura", "6 – 7.5 km"],
      ["Thrikkakkara Vamana Moorthy Temple", "5.25 – 6 km"],
      ["Thrikkakkara Siva Temple", "5.25 – 6 km"],
      ["Chottanikkara Bhagavathy Temple", "7.5 – 9 km"]
    ]
  },

  {
    title: "Mosques",
    icon: "fa-solid fa-mosque",
    items: [
      ["Kaloor Juma Masjid", "0.6 – 0.75 km"],
      ["Thottathumpadi Muslim Jamaath Highway Juma Masjid", "0.6 – 0.75 km"],
      ["Masjidul Islam", "1.5 km"],
      ["Taqwa Juma Masjid", "1.5 km"],
      ["Ernakulam Central Juma Masjid", "2.25 – 3 km"]
    ]
  },

  {
    title: "Churches",
    icon: "fa-solid fa-church",
    items: [
      ["St. Antony of Padua R.C. Church, Kaloor", "0.75 km"],
      ["St. Francis Xavier's R.C. Church", "0.75 km"],
      ["Little Flower Church", "1.5 – 2.25 km"],
      ["St. Mary's Syro-Malabar Cathedral Basilica", "2.25 – 3 km"],
      ["St. Teresa's Church", "2.25 – 3 km"]
    ]
  },

  {
    title: "Hospitals & Medical",
    icon: "fa-solid fa-hospital",
    items: [
      ["Lisie Hospital", "0.75 km"],
      ["PVS Memorial Hospital", "0.75 – 1.125 km"],
      ["Ernakulam Medical Centre", "1.5 – 2.25 km"],
      ["Amrita Hospital", "6 km"],
      ["Aster Medcity", "6 – 7.5 km"]
    ]
  },

  {
    title: "Tourist & Sightseeing",
    icon: "fa-solid fa-camera",
    wide: true,
    items: [
      ["Vailoppilli Smaraka Park", "0.75 – 1.125 km"],
      ["Jawaharlal Nehru Stadium", "0.75 – 1.125 km"],
      ["Mangalavanam Bird Sanctuary", "2.25 – 3 km"],
      ["Marine Drive, Kochi", "2.25 – 3 km"],
      ["Menaka / Menaka Junction", "2.25 – 3 km"],
      ["High Court of Kerala", "2.25 km"],
      ["High Court Boat Jetty", "1.875 – 2.25 km"],
      ["Rainbow Bridge, Marine Drive", "2.25 – 3 km"],
      ["Subhash Bose Park", "3 km"],
      ["Maharaja's College", "2.25 – 3 km"],
      ["MG Road", "1.875 – 2.25 km"],
      ["Bolgatty Palace", "3.75 – 4.5 km"],
      ["Kerala Museum", "4.5 – 5.25 km"],
      ["LuLu Mall", "5.25 km"],
      ["Kerala Folklore Museum", "5.25 – 6 km"],
      ["Thrikkakkara Temple", "5.25 – 6 km"],
      ["Sree Poornathrayeesa Temple", "6 – 7.5 km"],
      ["Chottanikkara Bhagavathy Temple", "7.5 – 9 km"],
      ["Mattancherry / Dutch Palace", "7.5 – 9 km"],
      ["Fort Kochi", "9 – 10.5 km"],
      ["Chinese Fishing Nets", "9 – 10.5 km"],
      ["Santa Cruz Basilica, Fort Kochi", "9 – 10.5 km"]
    ]
  },

  {
    title: "Shopping & Entertainment",
    icon: "fa-solid fa-bag-shopping",
    items: [
      ["Kaloor Shopping Area", "0 – 0.75 km"],
      ["Jawaharlal Nehru Stadium Commercial Area", "0.75 km"],
      ["MG Road Shopping Area", "2.25 km"],
      ["Centre Square Mall", "2.25 – 3 km"],
      ["Broadway Market", "3 km"],
      ["Marine Drive Shopping Area", "2.25 – 3 km"],
      ["LuLu International Shopping Mall", "5.25 km"]
    ]
  },

  {
    title: "Restaurants & Food",
    icon: "fa-solid fa-utensils",
    wide: true,
    items: [
      ["Calicut Notebook Restaurant", "0.375 – 0.75 km"],
      ["Waffee House Kochi", "0.6 – 0.75 km"],
      ["5 Star Family Restaurant", "0.75 km"],
      ["Magic Plate Restaurant", "0.375 – 0.75 km"],
      ["New Grilly's Restaurant", "0.525 – 0.75 km"],
      ["Happy Cup Heritage, Kaloor", "0.75 km"],
      ["Harbour Fish Restaurant", "0.75 – 1.125 km"],
      ["Machli Restaurant", "0.75 – 1.125 km"],
      ["Thakkolam Restaurant", "0.75 km"],
      ["Nila Restaurant, IMA House", "0.75 – 1.125 km"],
      ["The Taapioca Restaurant", "1.125 km"],
      ["SkyGrove Cafe Kochi", "0.75 – 1.125 km"],
      ["Plated Restaurant", "0.75 – 1.125 km"],
      ["Chiyang Restaurant", "1.125 – 1.5 km"],
      ["Hoy Punjab, Kacheripady", "1.125 – 1.5 km"],
      ["Hotel Saravana Bhavan", "1.5 km"]
    ]
  },

  {
    title: "Essential Services",
    icon: "fa-solid fa-building-columns",
    items: [
      ["IndianOil Petrol Pump", "0.375 – 0.75 km"],
      ["Aster Pharmacy, KK Road", "0.375 – 0.75 km"],
      ["Union Bank ATM", "0.375 km"],
      ["South Indian Bank, Kaloor", "0.75 km"],
      ["ATMs & Banks, Banerji Road", "0.375 – 0.75 km"],
      ["Ernakulam Town North Police Station", "1.125 – 1.5 km"],
      ["Fire & Rescue Station, Gandhinagar", "2.25 km"],
      ["Taxi Services", "0.75 km"],
      ["Auto-rickshaw / Taxi Stand", "0 – 0.75 km"]
    ]
  },

  {
    title: "Stadiums & Sports Complexes",
    icon: "fa-solid fa-person-running",
    items: [
      ["Jawaharlal Nehru International Stadium (Kaloor Stadium)", "0.75 – 1.125 km"],
      ["DNA Sports Indoor Arena, Kathrikadavu", "1.125 – 1.5 km"],
      ["Maharaja's College Ground", "2.25 – 3 km"],
      ["Rajiv Gandhi Indoor Stadium, Kadavanthra", "2.25 – 3 km"],
      ["Durbar Hall Ground", "2.25 – 3 km"]
    ]
  }
];