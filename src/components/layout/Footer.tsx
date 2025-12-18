export default function Footer() {
	return (
		<footer className="border-t bg-white mt-8">
			<div className="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-500 flex flex-col md:flex-row justify-between gap-2">
				<div>© {new Date().getFullYear()} RegalProp. All rights reserved.</div>
				<div>tagline</div>
			</div>
		</footer>
	);
}
