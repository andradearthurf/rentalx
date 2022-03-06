// O objetivo desse arquivo é ser uma funcionalidade que apaga o arquivo/imagem que
// já existe e salva o arquivo novo.

import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename);
  } catch {
    return;
  }
  await fs.promises.unlink(filename);
};
