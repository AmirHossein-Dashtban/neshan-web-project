"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function Page() {
	const mapRef = useRef();

	useEffect(() => {
		const map = mapRef.current;
		if (!map) {
			mapRef.current = new maplibregl.Map({
				container: "map",
				style: "https://demotiles.maplibre.org/style.json",
				center: [59.5528219217324, 36.32708394227474],
				zoom: 5,
			});
		}
		return () => map?.remove();
	}, []);

	return <div id="map" className="h-screen w-full"></div>;
}
