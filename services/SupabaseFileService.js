import {createClient} from "@supabase/supabase-js";

class SupabaseFileService {
	supabase;
	constructor() {
		this.supabase = createClient("https://sqizuvuxpggdqvnjwnhs.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxaXp1dnV4cGdnZHF2bmp3bmhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NjQ1ODkxMCwiZXhwIjoxOTkyMDM0OTEwfQ.SuCuDLs5sc-T8tamPs05tUYLDYOW0hpI_iO_OcNIBow");
	}

	async uploadFile(file, bucketName, fileName, path) {
		try {
			// console.log('UPLOAD', file)
			const { data, error } = await this.supabase.storage
				.from(bucketName)
				.upload(`${path+'/' || ""}${fileName}`, file);

			if (error) {
				throw new Error(error.message);
			}
			return data;
		} catch (e) {
			console.log(e)
			throw e;
		}
	}

	async removeFile(bucketName, path) {
		try {
			// console.log('UPLOAD', file)
			const { data, error } = await this.supabase.storage
				.from(bucketName)
				.remove(path);

			if (error) {
				throw new Error(error)
			}
			console.log('SUPABASE DELETE ===============', data)
			return data
		} catch (e) {
			console.log(e)
			throw Error(e)
		}
	}
}

export default new SupabaseFileService();