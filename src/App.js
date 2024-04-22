import * as React from "react"
import Drawer from "@mui/material/Drawer"
import videos from "./videos.json"
import podcasts from "./podcasts.json"
import VideoCard from "./Components/Cards/VideoCard"
import PodcastCard from "./Components/Cards/PodcastCard"
import GeoMap from "./Components/Map"
import { useState } from "react"
import { MapProvider } from "react-map-gl"
import { useRef, useEffect } from "react"
import { createRef } from "react"

const drawerWidth = 500

export default function LocationSpotlighter() {
  const [popupInfo, setPopupInfo] = useState(null)
  // eslint-disable-next-line
  const joinedLocations = [...podcasts, ...videos]
  const locationRef = useRef(joinedLocations.map(() => createRef()))

  useEffect(() => {
    if (popupInfo && locationRef.current) {
      const activeSiteId = joinedLocations.findIndex(
        (location) => location.name === popupInfo.name
      )
      locationRef.current[activeSiteId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [popupInfo, joinedLocations])

  const sortedLocations = joinedLocations.sort(
    (a, b) => b.geolocation.lng - a.geolocation.lng
  )

  return (
    <MapProvider>
      <div style={{ height: "100vh" }}>
        <GeoMap
          popupInfo={popupInfo}
          setPopupInfo={setPopupInfo}
          locations={joinedLocations}
        />
      </div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <div align="center">
          {sortedLocations.map((location, index) => (
            <div key={index} ref={(el) => (locationRef.current[index] = el)}>
              {location.type === "podcast" && (
                <PodcastCard
                  location={location}
                  popupInfo={popupInfo}
                  setPopupInfo={setPopupInfo}
                />
              )}
              {location.type === "video" && (
                <VideoCard
                  location={location}
                  popupInfo={popupInfo}
                  setPopupInfo={setPopupInfo}
                />
              )}
            </div>
          ))}
        </div>
      </Drawer>
    </MapProvider>
  )
}
