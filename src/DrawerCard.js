import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


export default function DrawerCard({location} )  {
    console.log(location)
  return (
    <Box pb={2}>
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            sx={{ height: 140 }}
            image="{locations.Title}"
            title="location"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {location.Title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {location.Description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
        </Card>
    </Box>
  );
}