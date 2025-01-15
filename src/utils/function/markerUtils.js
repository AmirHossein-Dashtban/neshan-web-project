import { MarkerFactory } from "@/utils/class/MarkerFactory";

export const printMarker = (
	listItem,
	mapState,
	markerImage,
	markerListRef,
	routingInfo
) => {
	listItem?.map((item) => {
		const marker = new MarkerFactory(
			mapState,
			markerImage,
			{
				lng: item.location.x,
				lat: item.location.y,
			},
			item,
			12,
			12,
			routingInfo
		);
		markerListRef?.current?.push(marker);
	});
};
export const removeMarker = (markerListRef) => {
	markerListRef.current?.forEach((marker) => {
		marker.remove();
	});
	markerListRef.current = [];
};
