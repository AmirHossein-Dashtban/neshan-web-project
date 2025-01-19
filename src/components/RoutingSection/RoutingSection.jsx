"use client";

import { useContext } from "react";
import { Button } from "../ui/button";
import Routing from "../Routing/Routing";
import { SidebarContext } from "@/context/Sidebar";

export default function RoutingSection({ lngLat }) {
	const { setHeight, isShowToast, setIsShowToast } = useContext(SidebarContext);

	const handleShowToast = () => {
		setIsShowToast(true);
		setHeight(50);
	};

	const handleCancelShowToast = () => {
		setIsShowToast(false);
		setHeight(window.innerHeight);
	};

	return (
		<>
			<div className="p-3 flex items-center justify-center">
				<Button className="w-1/2" onClick={handleShowToast}>
					مسیریابی
				</Button>
			</div>

			{isShowToast && (
				<Routing
					handleCancelShowToast={handleCancelShowToast}
					lngLat={lngLat}
				/>
			)}
		</>
	);
}
