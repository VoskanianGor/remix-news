export default function NewsListErrorBoundary() {
	return (
		<div className="text-center">
			<h4 className="text-center">
				<span>💥</span>
				<br />
				<span className="text-red-500">Something went wrong</span>
				<br />
				<span className="text-center font-normal">Please reload the page</span>
			</h4>

			<div className="flex items-center justify-center">
				<form method="get">
					<button className="italic font-bold" type="submit">
						reload
					</button>
				</form>
			</div>
		</div>
	)
}
