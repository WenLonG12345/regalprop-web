export default function JsonLd({ data }: any) {
	if (!data) return null;

	const json = Array.isArray(data) ? data : [data];

	return (
		<script
			type="application/ld+json"
			suppressHydrationWarning
			dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
		/>
	);
}
