import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/material"
import { useMap } from "react-map-gl"

export default function DrawerCard({ location }) {
  const { denmarkMap } = useMap()
  const onClick = () => {
    denmarkMap.flyTo({
      center: [location.geolocation.lng, location.geolocation.lat],
    })
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
        {/* <CardMedia
            sx={{ height: 140 }}
            image="{locations.Title}"
            title="location"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {location.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onClick}>
            Fly to site
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
