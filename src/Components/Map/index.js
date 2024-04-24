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
import PlaceIcon from "@mui/icons-material/Place"
import { Typography } from "@mui/material"
import theme from "../../theme"

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

export default function GeoMap({ popupInfo, setPopupInfo, locations }) {
  const pins = useMemo(
    () =>
      locations.map((location, index) => {
        const pinColor = location.type === 'podcast' ? theme.palette.podcastCardBackground : theme.palette.cardBackground
        return (
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
          <PlaceIcon
            fontSize="large"
            style={{
              fill:
                location.name === popupInfo?.name
                  ? theme.palette.lightGreen
                  : pinColor,
              filter: `drop-shadow(0px 0px 4px #000)`,
            }}
          />
        </Marker>
      )}
    ),
    [popupInfo, setPopupInfo, locations]
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
            <Typography gutterBottom variant="h5" component="div">
              {popupInfo.name}
            </Typography>
          </Popup>
        )}
      </Map>
    </>
  )
}
