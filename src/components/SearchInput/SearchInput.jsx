import { useEffect, useState } from "react";
import { Input } from "../ui/Input";
import CancelIcon from "../../../public/CancelIcon";

export default function SearchInput() {
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		console.log("useEffect");
	}, []);

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
