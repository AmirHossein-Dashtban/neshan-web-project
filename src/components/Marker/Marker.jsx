"use client";

import { Marker } from "maplibre-gl";
import { useEffect, useRef, useContext } from "react";
import { MapContext } from "@/context/MapContext";

const Marker_ = ({ initialLngLat, imageUrl }) => {
	const markerRef = useRef(null);
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		map.flyTo({
			center: [initialLngLat.lng, initialLngLat.lat],
			zoom: 16,
			speed: 2,
		});

		const markerElement = document.createElement("div");
		markerElement.style.backgroundImage = `url(${imageUrl})`;
		markerElement.style.backgroundSize = "cover";
		markerElement.style.width = "40px";
		markerElement.style.height = "40px";
		markerElement.style.cursor = "pointer";

		const marker = new Marker({ element: markerElement, anchor: "bottom" })
			.setLngLat(initialLngLat)
			.addTo(map);

		markerRef.current = marker;

		return () => {
			marker.remove();
		};
	}, [map, initialLngLat]);

	return <></>;
};

export default Marker_;
