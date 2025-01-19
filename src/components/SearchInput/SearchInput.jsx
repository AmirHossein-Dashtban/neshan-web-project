"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { MapContext } from "@/context/MapContext";
import { fetchSearchResult } from "@/api/fetchSearchResult";
import { Input } from "../ui/Input";
import { removeMarker } from "@/utils/function/markerUtils";
import primaryMarkerImage from "../../app/Restaurant.png";
import foodImage from "@/../public/food-two.jpg";
import { fitMapToBounds } from "@/utils/function/fitBounds";
import { MarkerWithPopup } from "../MarkerWithPopup/MarkerWithPopup";
import MainRouting from "../MianRouting/MainRouting";
import { clearMap } from "@/utils/function/setRoute";
import { X } from "lucide-react";
import Spinner from "../LoadingSpinner/Spinner";

export default function SearchInput() {
	const [searchValue, setSearchValue] = useState("");
	const markerListRef = useRef([]);
	const [data, setData] = useState();
	const { map } = useContext(MapContext);
	const [isRouting, setIsRouting] = useState(null);
	const [isLoading, setIsLoading] = useState("idle");

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const searchFromUrl = params.get("search");
		if (searchFromUrl) {
			setSearchValue(searchFromUrl);
		}
	}, []);

	useEffect(() => {
		let ignore = false;
		const points = [];
		if (markerListRef) {
			removeMarker(markerListRef);
		}

		if (searchValue) {
			const params = new URLSearchParams(window.location.search);
			params.set("search", searchValue);
			window.history.pushState(null, "", `?${params.toString()}`);
		} else {
			const params = new URLSearchParams(window.location.search);
			params.delete("?search");
			window.history.pushState(null, "", window.location.pathname);
		}
		if (searchValue) {
			setIsLoading("loading");
			fetchSearchResult(
				`رستوران ${searchValue}`,
				36.32708394227474,
				59.5528219217324
			).then((res) => {
				setIsLoading("idle");
				if (!ignore) {
					const items = res.items;
					items.forEach((item) => points.push(item.location));
					fitMapToBounds(map, points);
					setData(res.items);
				}
			});
		}

		return () => (ignore = true);
	}, [searchValue, map]);

	const handleInputChange = (e) => {
		setSearchValue(e.target.value);
		setIsRouting(null);
		clearMap(map);
	};

	const handleCancelClick = () => {
		setSearchValue("");
		setData(null);
		setIsRouting(null);
		clearMap(map);
	};

	return (
		<>
			<Input
				className="border-none w-[250px] focus-visible:ring-0 p-0 px-2"
				type="text"
				placeholder="جست‌وجو کنید..."
				value={searchValue}
				onChange={handleInputChange}
			/>

			{isLoading === "loading" ? (
				<Spinner />
			) : (
				<X
					className="bg-red text-white cursor-pointer mx-1 rounded hover:bg-slate-700 p-1"
					onClick={handleCancelClick}
				/>
			)}

			{data?.map((item, index) => {
				return (
					<MarkerWithPopup
						key={index}
						map={map}
						markerImageUrl={primaryMarkerImage.src}
						initialLngLat={{
							lng: item.location.x,
							lat: item.location.y,
						}}
						item={item}
						popupImage={foodImage.src}
						setLngLat={setIsRouting}
						setData={setData}
					/>
				);
			})}

			{isRouting !== null && (
				<MainRouting
					lngLat={isRouting}
					handleCancelShowToast={handleCancelShowToast}
				/>
			)}
		</>
	);
}
