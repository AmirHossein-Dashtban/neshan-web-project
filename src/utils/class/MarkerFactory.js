import { Marker, Popup } from "maplibre-gl";
import resturantImage from "../../../public/resturant-image.jpg";
export class MarkerFactory {
	map;
	marker;
	markerElement;
	moveHandler;
	constructor(
		map,
		imageUrl,
		initialLngLat,
		item,
		hover,
		popupContent,
		setRoutingInfo
	) {
		console.log(setRoutingInfo);
		
		this.map = map;
		let dim = "40px";
		if (hover) dim = "50px";

		this.markerElement = document.createElement("div");
		this.markerElement.style.backgroundImage = `url(${imageUrl?.src})`;
		this.markerElement.style.backgroundSize = "cover";
		this.markerElement.style.width = dim;
		this.markerElement.style.height = dim;
		if (hover) this.markerElement.classList.add("z-20");
		const handleRouting = () => {
			console.log(setRoutingInfo);
			setRoutingInfo((prev) => ({
				...prev,
				destinationLngLat: initialLngLat,
			}));
		};

		const popupContainer = document.createElement("div");
		popupContainer.className = "popupContainer";
		const image = document.createElement("img");
		image.src = resturantImage.src;
		image.alt = `رستوران ${item.title}`;
		const title = document.createElement("p");
		title.textContent = item.title;
		title.className = "popupContainer-title";
		const routingButton = document.createElement("button");
		routingButton.textContent = "مسیریابی";
		routingButton.className = "popupContainer-routing-button";
		routingButton.addEventListener("click", handleRouting);
		const infoButton = document.createElement("button");
		infoButton.textContent = "اظلاعات بیش‌تر";
		infoButton.className = "popupContainer-info-button";

		popupContainer.appendChild(image);
		popupContainer.appendChild(title);
		popupContainer.appendChild(routingButton);
		popupContainer.appendChild(infoButton);
		const popup = new Popup({
			closeButton: true,
			closeOnClick: true,
			className: "custom-popup",
			offset: {
				top: [0, 10],
				bottom: [0, -50],
				left: [10, 0],
				right: [-10, 0],
			},
		})
			.setDOMContent(popupContainer)
			.setLngLat(initialLngLat);

		this.marker = new Marker({
			element: this.markerElement,
			anchor: "bottom",
		})
			.setLngLat(initialLngLat)
			.addTo(map)
			.setPopup(popup);
		this.moveHandler = this.handleMove.bind(this);
	}
	handleMove() {
		if (this.map && this.marker) {
			this.marker.setLngLat(this.map.getCenter());
		}
	}
	on() {
		if (this.map) {
			this.map.on("move", this.moveHandler);
		}
	}
	off() {
		if (this.map) {
			this.map.off("move", this.moveHandler);
		}
	}
	remove() {
		if (this.marker) {
			this.marker.remove();
		}
	}
}
