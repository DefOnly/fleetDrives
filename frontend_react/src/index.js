import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RTLLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import SignInCentered from "views/auth/signIn";
import {PlacesProvider} from "contexts/places/PlacesContext";
import {MapProvider} from "contexts/map/MapContext";
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZGVmb25seSIsImEiOiJjbGE2N25kc3UwMHBlM29zMHFpbWFvaHAzIn0.6byxMcCQvzsHBdIITgSZlw';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
      <PlacesProvider>
      <MapProvider>
        <HashRouter>
          <Switch>
            <Route path={`/auth`} component={SignInCentered} />
            <Route path={`/admin`} component={AdminLayout} />
            <Route path={`/rtl`} component={RTLLayout} />
            <Redirect from='/' to='/auth' />
          </Switch>
        </HashRouter>
      </MapProvider>
      </PlacesProvider>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
