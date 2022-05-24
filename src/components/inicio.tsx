import React, { useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  Button,
  CardActionArea,
  CircularProgress,
  TextField,
} from "@mui/material";
import { LoadPictogramsFromArasaac } from "../services/arasaac-service";
import { IndexedDbService } from "../services/indexeddb-service";
import { IPictogram } from "../models/pictogram";
const db = new IndexedDbService();

let myContainerRef: React.MutableRefObject<null>;

export default function Inicio(props: any) {
  // TODO: El DOM no toma los cambios de la lista de pictogramasId, no se bien como funciona el State en React pero faltaria implementarlo.
  myContainerRef = useRef(null);

  return (
    <div>
      <Button variant="contained" onClick={() => LoadPictogramsFromArasaac()}>
        <CircularProgress variant="determinate" value={0} />
        Descargar todo Arasaac
      </Button>
      <Autocomplete
        id="select-pictogramid"
        options={["2334", "2244", "1233"]}
        getOptionLabel={(option) => option}
        sx={{ width: 300 }}
        onChange={(event, value) => {
          if (value) selectPictogramIdChanged(value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Buscar pictograma por id" />
        )}
      />
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="data:image/jpeg;base64,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"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Pictograma 1
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Una manzana
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <img id="image" alt="Pictogram selected" src="" />
    </div>
  );
}
async function selectPictogramIdChanged(value: string) {
  let picto: IPictogram = await db.getValue("pictograms", Number(value));

  document
    .getElementById("image")
    ?.setAttribute("src", URL.createObjectURL(picto.blob));
}
