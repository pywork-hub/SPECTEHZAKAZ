
export const useUploadFile = async (url: string): Promise<File | undefined> => {
	const response = await fetch(url);

	if (!response.ok) {
		return
	}

	const blob = await response.blob();

	const fileName = url.split('/').pop() || 'file';

	const file = new File([blob], fileName, { type: blob.type });

	return file;
}