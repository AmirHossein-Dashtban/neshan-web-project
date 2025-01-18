import ReactDOM from "react-dom";
import { Marker, Popup } from "maplibre-gl";
import { useEffect, useRef } from "react";
import Link from "next/link";

const MarkerWithPopup = ({
	map,
	imageUrl,
	initialLngLat,
	item,
	hover,
	setRoutingInfo,
	router,
}) => {
	const markerRef = useRef(null);
	const popupRef = useRef(null);

	const popupContainer = document.createElement("div");
	popupContainer.className = "popupContainer";

	useEffect(() => {
		if (!map) return;

		const markerElement = document.createElement("div");
		markerElement.style.backgroundImage = `url(${imageUrl})`;
		markerElement.style.backgroundSize = "cover";
		markerElement.style.width = hover ? "50px" : "40px";
		markerElement.style.height = hover ? "50px" : "40px";
		markerElement.style.cursor = "pointer";

		const popup = new Popup({ closeButton: true, closeOnClick: true })
			.setLngLat(initialLngLat)
			.setDOMContent(popupContainer);

		const marker = new Marker({ element: markerElement, anchor: "bottom" })
			.setLngLat(initialLngLat)
			.addTo(map)
			.setPopup(popup);

		markerRef.current = marker;
		popupRef.current = popup;

		return () => {
			marker.remove();
			popup.remove();
		};
	}, [map, imageUrl, initialLngLat, hover, item, setRoutingInfo, router]);

	return ReactDOM.createPortal(
		<>
			<img src={imageUrl} alt={`رستوران ${item.title}`} />
			<p className="popupContainer-title">{item.title}</p>
			<button
				className="popupContainer-routing-button"
				onClick={() =>
					setRoutingInfo({ destinationLngLat: initialLngLat })
				}
			>
				مسیریابی
			</button>
			<Link
				className="popupContainer-info-button"
				href={{
					pathname: `/info`,
					query: {
						title: item.title,
						address: item.address,
						lnglat: JSON.stringify(item.location),
					},
				}}
			>
				اطلاعات بیش‌تر
			</Link>
		</>,
		popupContainer
	);
};

export { MarkerWithPopup };
