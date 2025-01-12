"use client";

import { useContext, useEffect, useState } from "react";
import { MapContext } from "@/context/MapContext";
import { fetchSearchResult } from "@/api/fetchSearchResult";
import { Input } from "../ui/Input";
import CancelIcon from "../../../public/CancelIcon";

export default function SearchInput() {
	const [searchValue, setSearchValue] = useState("");
	const map = useContext(MapContext);

	useEffect(() => {
		let ignore = false;
		
		if (searchValue) {
			fetchSearchResult(
				`رستوران ${searchValue}`,
				36.32708394227474,
				59.5528219217324
			).then((res) => {
				if (!ignore) {
					console.log(res);
				}
			});
		}

		return () => (ignore = true);
	}, [searchValue]);

	const handleInputChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleCancelClick = () => {
		setSearchValue("");
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
