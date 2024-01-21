import { StorageClient } from '@supabase/storage-js'



const STORAGE_URL = 'https://sqizuvuxpggdqvnjwnhs.supabase.co/storage/v1'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxaXp1dnV4cGdnZHF2bmp3bmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0NTg5MTAsImV4cCI6MTk5MjAzNDkxMH0.O5XIdi5bmZ9FpawbPMGNCkGLt4J66RLp9UPAh9Ppcj0' //! service key, not anon key

const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
})

export const uploadPhoto = async (file) => {
    const { data, error } = await supabase.storage
      .from('addition-photo')
      .upload(`path/to/your/file/${file.name}`, file, {
        contentType: file.type
      })
  
    if (error) {
      console.error(error)
    } else {
      return data.Key
    }
}

export const createFolderSupa = async (folder_name) => {
  const { data, error } = await storageClient.createBucket('test')

  if (error) {
    return (error)
  } else {
    return (data)
  }
}









// try {
//   await fetch('https://catfact.ninja/fact')
//   .then((response) => response.json())
//   .then((data) => {
//     res.status(200).json({ res: data })
//   });
// } catch (error) {
//   res.status(200).json({ err: error })
// }