"use client";

import { useState } from "react";
import { SidebarContext } from "@/context/Sidebar";

export default function Footer({ children }) {
	const [height, setHeight] = useState(50);

	const handleMouseDown = () => {
		setHeight(height < 100 ? window.innerHeight - 300 : 50);
	};

	const handleClick = () => {
		setHeight(height < 100 ? window.innerHeight - 300 : 50);
	};

	return (
		<SidebarContext.Provider value={{ setHeight }}>
			<div>
				<div
					className={`scroll-remove tablet:hidden overflow-y-auto scroll-my-0 fixed left-0 bottom-0 w-full bg-slate-200 flex items-center justify-center cursor-grab transition-all duration-500 ease-in-out`}
					style={{ height: `${height}px` }}
				>
					<div
						className="absolute top-4 w-20 h-5 mb-1 bg-slate-500 rounded-full"
						onClick={handleClick}
						onMouseDown={handleMouseDown}
					></div>
					{children}
				</div>

				<div
					className={`hidden tablet:flex fixed right-0 top-0 w-[300] lg:w-[375] h-full bg-slate-200 items-center justify-center`}
				>
					{children}
				</div>
			</div>
		</SidebarContext.Provider>
	);
}
