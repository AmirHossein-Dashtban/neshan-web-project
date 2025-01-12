import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Map from "@/components/Map/Map";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Neshan Web",
	description: "Simple web map",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" dir="rtl">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Map>{children}</Map>
			</body>
		</html>
	);
}
