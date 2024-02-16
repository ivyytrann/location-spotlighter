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

// locally you can set this in the .env file, which is ignored by git (so you can keep your secrets secret)
// on vercel you can set these in the environment variables
const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const locations = [
  { Title: "test", geolocation: { lat: -34.9341, lng: 117.3611 } },
]

export default function App() {
  const [popupInfo, setPopupInfo] = useState(null)

  const pins = useMemo(
    () =>
      locations.map((location, index) => (
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
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
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
            <div>{popupInfo.Title}</div>
          </Popup>
        )}
      </Map>
    </>
  )
}
