import { UploadableFile } from '../../interface/Upload';
import { User } from '../../interface/User';

const uploadFile = async (
  files: UploadableFile[],
  loggedInUser: User | null | undefined,
  fetchConfig: { url: string; handler: string; maxFiles: number },
): Promise<string[]> => {
  const data = new FormData();

  files.map((fileWrapper) => {
    data.append(fetchConfig.handler, fileWrapper.file);
  });

  return await fetch(fetchConfig.url + loggedInUser?._id, {
    method: 'POST',
    body: data,
    credentials: 'include',
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.message);
    });
};

export default uploadFile;
