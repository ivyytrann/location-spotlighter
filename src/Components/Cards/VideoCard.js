import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/material"
import { useMap } from "react-map-gl"
import VideoFrame from "./VideoFrame"
import theme from "../../theme"

export default function DrawerCard({ location, popupInfo, setPopupInfo }) {
  const activeSite = location?.name === popupInfo?.name
  const { denmarkMap } = useMap()

  const onClick = () => {
    denmarkMap.flyTo({
      center: [location.geolocation.lng, location.geolocation.lat],
    })
    setPopupInfo(location)
  }

  const cardText = (
    <>
      <Typography gutterBottom variant="h5" component="div">
        {location.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {location.description}
      </Typography>
    </>
  )

  return (
    <Box pt={2} pb={1}>
      <Card
        sx={{ maxWidth: 445, padding: "10px" }}
        style={{
          backgroundColor: activeSite
            ? theme.palette.lightGreen
            : theme.palette.cardBackground,
        }}
      >
        <VideoFrame src={location.youtube_url} />
        <CardContent>{cardText}</CardContent>
        <Button size="small" align="center" onClick={onClick}>
          Fly to site
        </Button>
        <Button
          size="small"
          align="center"
          target="_blank"
          href={`https://www.google.com/maps/dir/?api=1&destination=${location.geolocation.lat},${location.geolocation.lng}`}
        >
          Directions
        </Button>
      </Card>
    </Box>
  )
}
