import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { green, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Link } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

type Props = {
  name: string;
  url: string;
};

export default function RecipeReviewCard({ name, url }: Props) {
  return (
    <Box>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
              i
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon sx={{ color: "green" }} />
            </IconButton>
          }
          title={name}
        />
        <CardMedia component="iframe" src={url} />
        <CardContent>
          <Link target="_blank" href={url}>
            {name}
          </Link>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon sx={{ color: "red" }} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon sx={{ color: "gray" }} />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}
