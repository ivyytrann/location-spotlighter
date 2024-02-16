import * as React from "react"
import { useState, useMemo } from "react"
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl"
import Pin from "./pin"
import { Typography } from "@mui/material"

// locally you can set this in the .env file, which is ignored by git (so you can keep your secrets secret)
// on vercel you can set these in the environment variables
const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

export default function GeoMap({ popupInfo, setPopupInfo, videos }) {
  const pins = useMemo(
    () =>
      videos.map((location, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={location.geolocation.lng}
          latitude={location.geolocation.lat}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation()
            setPopupInfo(location)
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  )

  return (
    <>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
        rel="stylesheet"
      />
      <Map
        initialViewState={{
          latitude: -34.9341,
          longitude: 117.3611,
          zoom: 10,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.geolocation.lng)}
            latitude={Number(popupInfo.geolocation.lat)}
            onClose={() => setPopupInfo(null)}
          >
            <Typography variant="h6">{popupInfo.name}</Typography>
            <Typography variant="body">{popupInfo.description}</Typography>
          </Popup>
        )}
      </Map>
    </>
  )
}
