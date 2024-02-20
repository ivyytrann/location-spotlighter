import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/material"
import { useMap } from "react-map-gl"


export default function DrawerCard({ location, setPopupInfo }) {
  const { denmarkMap } = useMap()
  
  const onClick = () => {
    denmarkMap.flyTo({
      center: [location.geolocation.lng, location.geolocation.lat],
    })
    setPopupInfo(location)
  }

  return (
    <Box pt={2} pb={2}>
      <Card sx={{ maxWidth: 345 }}>
        <iframe
          width="320"
          height="180"
          src={location.youtube_url}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {location.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location.description}
          </Typography>
        </CardContent>
          <Button size="small" align="center" onClick={onClick} >
            Fly to site
          </Button>
      </Card>
    </Box>
  )
}
