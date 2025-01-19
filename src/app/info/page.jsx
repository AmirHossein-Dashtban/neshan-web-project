import Siwper from "@/components/ImageSwiper/Siwper";
import Info from "@/components/Info/Info";

import foodOne from "@/../public/food-one.jpg";
import foodTwo from "@/../public/food-two.jpg";
import foodThree from "@/../public/food-three.jpg";
import foodFour from "@/../public/food-four.jpg";

export default function Page({ searchParams }) {
	return (
		<section className="w-full absolute top-10">
			<Siwper images={[foodTwo.src, foodThree.src, foodFour.src]} />

			<Info searchParams={searchParams} />
		</section>
	);
}

{
	/* <>
			<>
				<Siwper
					images={[
						ResturantImage.src,
						ResturantImg.src,
						ResturantImage.src,
					]}
				/>

				<Info searchParams={searchParams} />
			</>

			<>
				<Siwper
					images={[
						ResturantImage.src,
						ResturantImg.src,
						ResturantImage.src,
					]}
				/>

				<Info searchParams={searchParams} />
			</>
		</> */
}
