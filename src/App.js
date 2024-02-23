import * as React from "react"
import Drawer from "@mui/material/Drawer"
import videos from "./videos.json"
import DrawerCard from "./Components/DrawerCard"
import GeoMap from "./Components/Map"
import { useState } from "react"
import { MapProvider } from "react-map-gl"
import Alert from '@mui/material/Alert';
import { Typography } from "@mui/material"
import PlaceIcon from '@mui/icons-material/Place';




const drawerWidth = 400

export default function LocationSpotlighter() {
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
        <Alert icon={<PlaceIcon fontSize="inherit" />}>
          <Typography heading="h1">Locations</Typography>
        </Alert>
        
        <div align="center">
          {videos.map((location, index) => (
            <DrawerCard key={index} location={location} setPopupInfo={setPopupInfo}/>
          ))}
        </div>
      </Drawer>
    </MapProvider>
  )
}
