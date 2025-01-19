"use client";

import { useState } from "react";
import Image from "next/image";

export default function ({ images }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex > 0 ? prevIndex - 1 : images.length - 1
		);
	};

	const goToNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex < images.length - 1 ? prevIndex + 1 : 0
		);
	};

	return (
		<div className="w-full mt-4 p-4">
			<div className="overflow-hidden flex-col flex justify-center items-center rounded-lg">
				<div className="h-150 w-250">
					<Image
						src={images[currentIndex]}
						alt={`Slide ${currentIndex + 1}`}
						width={250}
						height={250}
					/>
				</div>

				<div className="flex items-center justify-center mt-4 mx-1">
					{images.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={`w-3 h-3 rounded-full mx-1 ${
								index === currentIndex
									? "bg-blue-500"
									: "bg-gray-400"
							}`}
						/>
					))}
				</div>

				<div className="w-full my-4 flex justify-center items-center">
					<button
						onClick={goToPrevious}
						className="bg-gray-700 text-white ml-2 flex items-center justify-center rounded-full p-2 hover:bg-gray-900"
					>
						▶
					</button>
					<button
						onClick={goToNext}
						className="bg-gray-700 text-white flex mr-2 items-center justify-center rounded-full p-2 hover:bg-gray-900"
					>
						◀
					</button>
				</div>
			</div>
		</div>
	);
}
