import { Marker, Popup } from "maplibre-gl";

export class MarkerFactory {
	map;
	marker;
	markerElement;
	moveHandler;

	constructor(map, imageUrl, initialLngLat, hover, popupContent) {
		this.map = map;

		let dim = "40px";

		if (hover) dim = "50px";

		this.markerElement = document.createElement("div");
		this.markerElement.style.backgroundImage = `url(${imageUrl?.src})`;
		this.markerElement.style.backgroundSize = "cover";
		this.markerElement.style.width = dim;
		this.markerElement.style.height = dim;
		if (hover) this.markerElement.classList.add("z-20");

		this.marker = new Marker({
			element: this.markerElement,
			anchor: "bottom",
		})
			.setLngLat(initialLngLat)
			.addTo(map);

		if (popupContent) {
			const popopConatiner = `<div className='custom-popup-content'>${popupContent}</div>`;

			const popup = new Popup({
				closeButton: false,
				closeOnClick: false,
				className: "custom-popup",
				offset: {
					top: [0, 10],
					bottom: [0, -50],
					left: [10, 0],
					right: [-10, 0],
				},
			})
				.setHTML(popopConatiner)
				.addTo(map);

			this.marker.setPopup(popup);
		}

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
