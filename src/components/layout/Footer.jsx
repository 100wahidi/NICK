export default function Footer() {
	return (
		<footer className="border-t border-[#9ED8B5]/55 bg-[#0B0D10] px-5 py-10 text-center text-[#9EA7B3] sm:px-8">
			<div className="mx-auto max-w-6xl">
				<nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm">
					<a className="footer-link" href="/">
						About
					</a>
					<a
						className="footer-link"
						href="https://github.com/100wahidi/rag_api"
						target="_blank"
						rel="noreferrer"
					>
						Source
					</a>
					<span className="footer-link-disabled" aria-disabled="true">
						Contact
					</span>
				</nav>

				<p className="mt-7 text-sm">
					Built with <span className="text-[#F5F7FA]">CurateCV</span>
				</p>

				<p className="mt-2 text-xs text-[#697383]">
					AI-assisted resume generation for serious applications.
				</p>
			</div>
		</footer>
	);
}
