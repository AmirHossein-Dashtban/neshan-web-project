"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { MapContext } from "@/context/MapContext";
import { fetchRoute } from "@/api/fetchRoute";
import { clearMap, setRoute } from "@/utils/function/setRoute";
import { Marker } from "maplibre-gl";
import originPhoto from "@/../public/origin-marker.png";

export default function Routing({ lngLat }) {
	const [isLoadingRoute, setIsLoadingRoute] = useState("idle");
	const { map } = useContext(MapContext);
	const originMarkerRef = useRef();
	const { x: lng, y: lat } = JSON.parse(lngLat);
	const imageUrl = JSON.parse(JSON.stringify(originPhoto)).src;

	const isLoadingRouteRef = useRef(isLoadingRoute);

	useEffect(() => {
		isLoadingRouteRef.current = isLoadingRoute;
	}, [isLoadingRoute]);

	useEffect(() => {
		const handleClick = (e) => {
			if (isLoadingRouteRef.current === "idle") {
				setIsLoadingRoute("loading");
				clearMap(map);

				const markerElement = document.createElement("div");
				markerElement.style.backgroundImage = `url(${imageUrl})`;
				markerElement.style.backgroundSize = "cover";
				markerElement.style.width = "40px";
				markerElement.style.height = "40px";
				markerElement.style.cursor = "pointer";

				originMarkerRef.current = new Marker({
					element: markerElement,
					anchor: "bottom",
				})
					.setLngLat(e.lngLat)
					.addTo(map);

				fetchRoute(e.lngLat, { lng, lat }).then((res) => {
					setIsLoadingRoute("success");
					setRoute(map, res);
				});
			}
		};

		map?.on("click", handleClick);

		return () => {
			map?.off("click", handleClick);
			clearMap(map);
			originMarkerRef.current?.remove();
		};
	}, [map]);

	const handleResetRouting = () => {
		clearMap(map);
		originMarkerRef.current?.remove();
		setIsLoadingRoute("idle");
	};

	return (
		<div className="w-2/3 z-20 flex justify-center fixed left-0 md:left-2 top-4">
			{isLoadingRoute === "idle" && (
				<div className="bg-slate-200 p-4 phone:w-auto rounded-sm text-sm sm:text-base">
					کجا می‌خواهید بروید؟ با کلیک بر روی نقشه مشخص کنید!
				</div>
			)}

			{isLoadingRoute === "loading" && (
				<div className="bg-slate-200 p-4 phone:w-auto rounded-sm text-sm sm:text-base">
					در حال دریافت مسیر...
				</div>
			)}

			{isLoadingRoute === "success" && (
				<button
					className="bg-slate-200 p-4 phone:w-auto rounded-lg hover:bg-slate-300 text-sm sm:text-base"
					onClick={handleResetRouting}
				>
					مسیریابی مجدد
				</button>
			)}
		</div>
	);
}
