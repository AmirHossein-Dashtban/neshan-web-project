import Sidebar from "@/components/Sidebar/Sidebar";

export const metadata = {
	title: "Neshan Web",
	description: "Simple web map",
};

export default function InfoLayout({ children }) {
	return <Sidebar>{children}</Sidebar>;
}
