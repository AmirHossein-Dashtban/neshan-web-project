import localFont from 'next/font/local'
import { Geist } from "next/font/google";
import "./globals.css";
import Map from "@/components/Map/Map";

const vazirMatn = localFont({
	src: "../../public/fonts/Vazirmatn-Regular.woff2"
});

export const metadata = {
	title: "Neshan Web",
	description: "Simple web map",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" dir="rtl">
			<body
				className={vazirMatn.className}
			>
				<Map>{children}</Map>
			</body>
		</html>
	);
}
