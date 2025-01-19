"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { MapContext } from "@/context/MapContext";
import { fetchRoute } from "@/api/fetchRoute";
import { clearMap, setRoute } from "@/utils/function/setRoute";
import { Marker } from "maplibre-gl";
import originPhoto from "@/../public/origin-marker.png";
import { fitMapToBounds } from "@/utils/function/fitBounds";
import { X } from "lucide-react";

export default function MainRouting({ lngLat, handleCancelShowToast }) {
	const [isLoadingRoute, setIsLoadingRoute] = useState("idle");
	const { map } = useContext(MapContext);
	const originMarkerRef = useRef();
    const {lng, lat} = lngLat
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
					fitMapToBounds(map, [
						{ x: e.lngLat.lng, y: e.lngLat.lat },
						{ x: lng, y: lat },
					]);
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
		<div className="w-full z-20 flex justify-center fixed bottom-4">
			{isLoadingRoute === "idle" && (
				<div className="bg-slate-700 flex text-white text-whiteflex justify-center py-4 px-2 rounded-sm text-sm sm:text-base">
					<span>کجا هستید؟ با کلیک بر روی نقشه مشخص کنید!</span>
					<span className="mr-2 border-r-slate-300 pr-1">
						<X onClick={()=>{handleCancelShowToast(null)}} width={20} height={20} cursor={"pointer"} />
					</span>
				</div>
			)}

			{isLoadingRoute === "loading" && (
				<div className="bg-slate-800 text-white p-4 phone:w-auto rounded-sm text-sm sm:text-base">
					در حال دریافت مسیر...
				</div>
			)}

			{isLoadingRoute === "success" && (
				<button
					className="bg-slate-800 text-white p-4 phone:w-auto rounded-lg hover:bg-slate-700 text-sm sm:text-base"
					onClick={handleResetRouting}
				>
					مسیریابی مجدد
				</button>
			)}
		</div>
	);
}
