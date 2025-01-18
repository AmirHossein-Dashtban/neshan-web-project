import Siwper from "@/components/ImageSwiper/Siwper";
import ResturantImage from "../Restaurant.png";
import ResturantImg from "@/../public/resturant-image.jpg";
import Info from "@/components/Info/Info";

export default function Page({searchParams}) {
	return (
		<>
			<div className="absolute bg-white rounded right-0 top-0 lg:w-1/3 hidden w-full lg:flex flex-col items-center h-full">
				<Siwper
					images={[
						ResturantImage.src,
						ResturantImg.src,
						ResturantImage.src,
					]}
				/>

				<Info searchParams={searchParams} />
			</div>

			<div className="absolute bg-white rounded right-0 top-0 w-full lg:hidden flex flex-col items-center h-full">
				<Siwper
					images={[
						ResturantImage.src,
						ResturantImg.src,
						ResturantImage.src,
					]}
				/>

				<Info searchParams={searchParams} />
			</div>
		</>
	);
}
