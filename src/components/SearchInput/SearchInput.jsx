"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { MapContext } from "@/context/MapContext";
import { fetchSearchResult } from "@/api/fetchSearchResult";
import { Input } from "../ui/Input";
import CancelIcon from "../../../public/CancelIcon";
import { printMarker, removeMarker } from "@/utils/function/markerUtils";
import primaryMarkerImage from "../../app/Restaurant.png";
import { fitMapToBounds } from "@/utils/function/fitBounds";

export default function SearchInput() {
	const [searchValue, setSearchValue] = useState("");
	const markerListRef = useRef([]);
	const { map, routingInfo, setRoutingInfo } = useContext(MapContext);
	
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
			params.delete("search");
			window.history.pushState(null, "", `?${params.toString()}`);
		}
		if (searchValue) {
			fetchSearchResult(
				`رستوران ${searchValue}`,
				36.32708394227474,
				59.5528219217324
			).then((res) => {
				if (!ignore) {
					const items = res.items;
					printMarker(
						items,
						map,
						primaryMarkerImage,
						markerListRef,
						setRoutingInfo
					);
					items.forEach((item) => points.push(item.location));
					fitMapToBounds(map, points);
				}
			});
		}
		return () => (ignore = true);
	}, [searchValue, map]);
	const handleInputChange = (e) => {
		setSearchValue(e.target.value);
	};
	const handleCancelClick = () => {
		setSearchValue("");
		removeMarker(markerListRef);
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
			<CancelIcon
				className="bg-red cursor-pointer mx-1 rounded hover:bg-slate-300 p-1"
				onClick={handleCancelClick}
			/>
		</>
	);
}
