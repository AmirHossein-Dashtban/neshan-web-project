"use client";
import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapContext } from "@/context/MapContext";

export default function Map({ children }) {
	const mapRef = useRef();
	const [isMapLoaded, setIsMapLoaded] = useState(false);
	const [routingInfo, setRoutingInfo] = useState({
		originLngLat: { lng: null, lat: null },
		destinationLngLat: { lng: null, lat: null },
	});

	useEffect(() => {
		if (!mapRef.current) {
			mapRef.current = new maplibregl.Map({
				container: "map",
				style: {
					version: 8,
					sources: {
						osm: {
							type: "raster",
							tiles: [
								"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
							],
							tileSize: 256,
						},
					},
					layers: [
						{
							id: "osm-tiles",
							type: "raster",
							source: "osm",
						},
					],
				},
				center: [59.5528219217324, 36.32708394227474],
				zoom: 10,
			});

			mapRef.current.on("load", () => {
				setIsMapLoaded(true);
			});
		}

		return () => mapRef.current?.remove();
	}, []);

	return (
		<MapContext.Provider
			value={{
				map: mapRef.current,
				routingInfo,
				setRoutingInfo,
			}}
		>
			<div id="map" className="h-screen w-full"></div>
			{children}
		</MapContext.Provider>
	);
}
