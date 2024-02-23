import * as React from "react"
import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import videos from "./videos.json"
import DrawerCard from "./Components/DrawerCard"
import GeoMap from "./Components/Map"
import { useState } from "react"
import { MapProvider } from "react-map-gl"

const drawerWidth = 400

export default function LocationDrawer() {
  const [popupInfo, setPopupInfo] = useState(null)

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
        <Toolbar />
        <div align="center">
          {videos.map((location, index) => (
            <DrawerCard key={index} location={location} setPopupInfo={setPopupInfo}/>
          ))}
        </div>
      </Drawer>
    </MapProvider>
  )
}
