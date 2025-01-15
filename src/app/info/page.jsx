import Siwper from "@/components/ImageSwiper/Siwper";
import ResturantImage from "../Restaurant.png";
import ResturantImg from "@/../public/resturant-image.jpg"

export default function Page() {
	return (
		<div className="absolute bg-slate-200 rounded right-0 top-0 w-1/3 flex items-center justify-between h-full">
			<Siwper
				images={[
					ResturantImage.src,
					ResturantImg.src,
					ResturantImage.src,
				]}
			/>
		</div>
	);
}
