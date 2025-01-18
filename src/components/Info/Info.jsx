import { Clock, LocateIcon, PhoneCall } from "lucide-react";
import StarFill from "@/../public/StarFill";
import Marker from "../Marker/Marker";
import SecondaryRestuarantImage from "@/../public/restaurantlocation.png";
import RoutingSection from "../RoutingSection/RoutingSection";

export default async function Info({ searchParams }) {
	const info = await searchParams;

	const { x: lng, y: lat } = JSON.parse(info.lnglat);
	const imageUrl = JSON.parse(JSON.stringify(SecondaryRestuarantImage)).src;

	return (
		<>
			<div className="w-full mt-8">
				<div className="flex flex-col p-3">
					<div className="mb-2 text-lg">{info.title}</div>
					<div className="flex items-center">
						<section className="flex">
							{new Array(5).fill(0).map((_, index) => (
								<StarFill key={index} />
							))}
						</section>
						<span className="mr-8">۹ رأی</span>
					</div>
				</div>

				<hr className="bg-[#ccc] my-2 w-full h-1" />

				<div className="px-3 py-1">
					<div className="flex">
						<LocateIcon size={20} className="ml-4" />
						<p>{info.address}</p>
					</div>
					<div className="flex my-4">
						<Clock size={20} className="ml-4" />
						<p>۹ صبح تا ۹ شب</p>
					</div>
					<div className="flex">
						<PhoneCall size={20} className="ml-4" />
						<p>۰۹۳۵۸۴۳۱۲۶۸</p>
					</div>
				</div>

				<hr className="bg-[#ccc] my-2 w-full h-1" />

				<RoutingSection lngLat={info?.lnglat} />
			</div>

			<Marker initialLngLat={{ lng, lat }} imageUrl={imageUrl} />
		</>
	);
}
