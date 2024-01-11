import Image from "next/image";

export default function Layout ({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative bg-[#005FFF] h-screen w-screen flex justify-center items-center overflow-hidden">
			<Image
				alt=""
				src="/img/effects/circle.svg"
				width="500" height="500"
				className="absolute top-[-250px] left-[-250px]"
			/>

			<Image
				alt=""
				src="/img/effects/circle.svg"
				width="1000" height="1000"
				className="absolute bottom-[-500px] right-[-500px]"
			/>

			{children}
		</div>
	)
}