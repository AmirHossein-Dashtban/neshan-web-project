"use client"

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
		<div className="relative w-full max-w-lg mx-auto">
			<div className="overflow-hidden flex justify-center items-center w-full h-[400px] rounded-lg">
				<Image
					src={images[currentIndex]}
					alt={`Slide ${currentIndex + 1}`}
                    width={500}
                    height={500}
					className="w-full h-auto object-cover"
				/>
			</div>

			<button
				onClick={goToPrevious}
				className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-900"
			>
				◀
			</button>
			<button
				onClick={goToNext}
				className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-900"
			>
				▶
			</button>

			<div className="flex items-center justify-center space-x-2 mt-4">
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={`w-3 h-3 rounded-full ml-2 ${
							index === currentIndex ? "bg-blue-500" : "bg-gray-400"
						}`}
					/>
				))}
			</div>
		</div>
	);
}
