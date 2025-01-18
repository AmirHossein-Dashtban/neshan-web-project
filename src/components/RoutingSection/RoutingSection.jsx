"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import Routing from "../Routing/Routing";

export default function RoutingSection({ lngLat }) {
	const [isShowToast, setIsShowToast] = useState(false);

	const handleShowToast = () => {
		setIsShowToast(true);
	};

	const handleCancelShowToast = () => {
		setIsShowToast(false);
	};

	return (
		<>
			<div className="p-3 flex items-center justify-center">
				<Button className="w-1/2" onClick={handleShowToast}>مسیریابی</Button>
			</div>

			{isShowToast && (
				<>
					<div className="p-3 flex items-center justify-center">
						<Button className="w-1/2" onClick={handleCancelShowToast}>
							لغو مسیریابی
						</Button>
					</div>

					<Routing lngLat={lngLat} />
				</>
			)}
		</>
	);
}
