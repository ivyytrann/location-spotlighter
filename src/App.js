import * as React from "react"
import Drawer from "@mui/material/Drawer"
import videos from "./videos.json"
import DrawerCard from "./Components/DrawerCard"
import GeoMap from "./Components/Map"
import { useState } from "react"
import { MapProvider } from "react-map-gl"
import Alert from "@mui/material/Alert"
import { Typography } from "@mui/material"
import PlaceIcon from "@mui/icons-material/Place"
import { useRef, useEffect } from "react"
import { createRef } from "react"

const drawerWidth = 400

export default function LocationSpotlighter() {
  const [popupInfo, setPopupInfo] = useState(null)
  const locationRef = useRef(videos.map(() => createRef()))

  useEffect(() => {
    if (popupInfo && locationRef.current) {
      const activeSiteId = videos.findIndex(
        (location) => location.name === popupInfo.name
      )
      locationRef.current[activeSiteId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [popupInfo])

  return (
    <MapProvider>
      <div style={{ height: "100vh" }}>
        <GeoMap
          popupInfo={popupInfo}
          setPopupInfo={setPopupInfo}
          videos={videos}
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
          {videos.map((location, index) => (
            <div key={index} ref={(el) => (locationRef.current[index] = el)}>
              <DrawerCard
                location={location}
                popupInfo={popupInfo}
                setPopupInfo={setPopupInfo}
              />
            </div>
          ))}
        </div>
      </Drawer>
    </MapProvider>
  )
}
