"use client";

import { useContext, useEffect, useState } from "react";
import { MapContext } from "@/context/MapContext";
import { fetchRoute } from "@/api/fetchRoute";
import { clearMap, setRoute } from "@/utils/function/setRoute";

export default function Routing({ lngLat }) {
	const [isLoadingRoute, setIsLoadingRoute] = useState("idle");
	const { map, routingInfo, setRoutingInfo } = useContext(MapContext);

	useEffect(() => {
		const handleClick = (e) => {
			if (routingInfo?.destinationLngLat.lng !== null) {
				setIsLoadingRoute("loading");
				clearMap(map);
				fetchRoute(e.lngLat, routingInfo?.destinationLngLat).then((res) => {
					setRoutingInfo({
						originLngLat: { lng: null, lat: null },
						destinationLngLat: { lng: null, lat: null },
					});
					setRoute(map, res);
					setIsLoadingRoute("success");
				});
			}
		};

		if (routingInfo.destinationLngLat?.lng) {
			map?.on("click", handleClick);
		}

		return () => {
			map?.off("click", handleClick);
		};
	}, [map, routingInfo?.destinationLngLat.lng]);

	const handleResetRouting = () => {
		clearMap(map);
		setIsLoadingRoute("idle");
	};

	return (
		<>
			<div className="w-full flex justify-center fixed bottom-12">
				{routingInfo.destinationLngLat?.lng &&
					isLoadingRoute === "idle" && (
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
		</>
	);
}
