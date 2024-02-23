import * as React from "react"
import { useMemo } from "react"
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl"
import PlaceIcon from '@mui/icons-material/Place';
import { Typography } from "@mui/material"

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
            e.originalEvent.stopPropagation()
            setPopupInfo(location)
          }}
        >
          <PlaceIcon style={{fill: location.name === popupInfo?.name ? "#FFF" : "red"} } />
        </Marker>
      )),
    [popupInfo, setPopupInfo, videos]
  )

  return (
    <>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
        rel="stylesheet"
      />
      <Map
        id="denmarkMap"
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
