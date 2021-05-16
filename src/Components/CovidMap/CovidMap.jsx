import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import useSWR from "swr";
import lookup from "country-code-lookup";
import "./CovidMap.css";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "<YOUR MAPBOX TOKEN>"

function CovidMap() {
  const mapboxElRef = useRef(null); 

  const fetcher = url =>
    fetch(url)
      .then(r => r.json())
      .then(data =>
        data.map((point, index) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              point.coordinates.longitude,
              point.coordinates.latitude
            ]
          },
          properties: {
            id: index,
            country: point.country,
            province: point.province,
            cases: point.stats.confirmed,
            deaths: point.stats.deaths
          }
        }))
      );

  const { data } = useSWR("https://corona.lmao.ninja/v2/jhucsse", fetcher);

  
  useEffect(() => {
    if (data) {
      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: "mapbox://styles/notalemesa/ck8dqwdum09ju1ioj65e3ql3k",
        center: [16, 27],
        zoom: 2
      });

      
      map.addControl(new mapboxgl.NavigationControl());

      map.once("load", function() {
        
        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: data
          }
        });

        
        map.addLayer({
          id: "circles",
          source: "points",
          type: "circle",
          paint: {
            "circle-opacity": 0.75,
            "circle-stroke-width": [
              "interpolate",
              ["linear"],
              ["get", "cases"],
              1,
              1,
              100000,
              1.75
            ],
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "cases"],
              1,
              4,
              1000,
              8,
              4000,
              10,
              8000,
              14,
              12000,
              18,
              100000,
              40
            ],
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", "cases"],
              1,
              "#ffffb2",
              5000,
              "#fed976",
              10000,
              "#feb24c",
              25000,
              "#fd8d3c",
              50000,
              "#fc4e2a",
              75000,
              "#e31a1c",
              100000,
              "#b10026"
            ]
          }
        });

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        let lastId;

        map.on("mousemove", "circles", e => {
          const id = e.features[0].properties.id;

          if (id !== lastId) {
            lastId = id;
            const {
              cases,
              deaths,
              country,
              province
            } = e.features[0].properties;

            
            map.getCanvas().style.cursor = "pointer";

            const coordinates = e.features[0].geometry.coordinates.slice();

            const countryISO =
              lookup.byCountry(country)?.iso2 ||
              lookup.byInternet(country)?.iso2;
            const provinceHTML =
              province !== "null" ? `<p>Province: <b>${province}</b></p>` : "";
            const mortalityRate = ((deaths / cases) * 100).toFixed(2);
            const countryFlagHTML = Boolean(countryISO)
              ? `<img src="https://www.countryflags.io/${countryISO}/flat/64.png"></img>`
              : "";

            const HTML = `<p>Country: <b>${country}</b></p>
                ${provinceHTML}
                <p>Cases: <b>${cases}</b></p>
                <p>Deaths: <b>${deaths}</b></p>
                <p>Mortality Rate: <b>${mortalityRate}%</b></p>
                ${countryFlagHTML}`;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup
              .setLngLat(coordinates)
              .setHTML(HTML)
              .addTo(map);
          }
        });

        map.on("mouseleave", "circles", function() {
          lastId = undefined;
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
      });
    }
  }, [data]);


  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin:20
    },
    map:{
      minWidth:800,
      minHeight:500,
      margin:15,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.map}>
        <div className="mapBox" ref={mapboxElRef} />
      </CardContent>
    </Card>
  );
}

export default CovidMap;
