"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapContext } from "@/context/MapContext";

export default function Map({ children }) {
	const mapRef = useRef();
	const [isMapLoaded, setIsMapLoaded] = useState(false);

	useEffect(() => {
		const map = mapRef.current;

		if (!map) {
			mapRef.current = new maplibregl.Map({
				container: "map",
				style: "https://demotiles.maplibre.org/style.json",
				center: [59.5528219217324, 36.32708394227474],
				zoom: 5,
			});
			setIsMapLoaded(true);
		}

		return () => map?.remove();
	}, [isMapLoaded]);

	return (
		<MapContext value={mapRef.current}>
			<div id="map" className="h-screen w-full"></div>
			{children}
		</MapContext>
	);
}
