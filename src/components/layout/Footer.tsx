import Image from "next/image";

export function Footer() {
	return (
		<footer className='w-full p-4 mt-auto'>
			<div className='flex justify-center'>
				<Image
					src='/natural-selection.png'
					alt='Natural Selection'
					width={701} // Intrinsic width
					height={201} // Intrinsic height
					style={{
						maxWidth: "225px", // or width: "225px" if you want it fixed
						height: "auto",
					}}
					priority
				/>
			</div>
		</footer>
	);
}
