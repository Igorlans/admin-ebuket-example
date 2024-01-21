export default function blobToFile(blob, filename) {
	// Create a new File constructor
	const file = new File([blob], filename, { type: blob.type });
	return file;
}