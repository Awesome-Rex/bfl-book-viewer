import React, { useRef } from "react";

//Scripts
export default function useVendors() {
	

	return useRef(
		<>
			{/* jQuery <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> */}
			{/* PDF.js <script src="https://www.jsdelivr.com/package/npm/pdfjs-dist"></script> */}
			{/* FontAwesome <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" /> */}
		</>
	).current;
}
