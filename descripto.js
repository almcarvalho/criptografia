const { privateDecrypt, constants } = require("crypto");
const { readFileSync, writeFileSync, existsSync } = require("fs");
const path = require("path");

const caminhoArquivoCriptografado = path.join(__dirname, "segredo-criptografado");
const caminhoArquivoDescriptografado = path.join(
  __dirname,
  "segredo-descriptografado"
);
const caminhoChavePrivada = path.join(
  __dirname,
  "certificado",
  "chave-privada.pem"
);

if (!existsSync(caminhoArquivoCriptografado)) {
  console.error(
    "O arquivo criptografado nao foi encontrado:",
    caminhoArquivoCriptografado
  );
  process.exit(1);
}

if (!existsSync(caminhoChavePrivada)) {
  console.error("A chave privada do repositorio nao foi encontrada:", caminhoChavePrivada);
  process.exit(1);
}

const textoCriptografado = readFileSync(caminhoArquivoCriptografado, "utf8");
const chavePrivada = readFileSync(caminhoChavePrivada, "utf8");

const textoDescriptografado = privateDecrypt(
  {
    key: chavePrivada,
    padding: constants.RSA_PKCS1_OAEP_PADDING,
  },
  Buffer.from(textoCriptografado, "base64")
).toString("utf8");

writeFileSync(caminhoArquivoDescriptografado, textoDescriptografado, "utf8");

console.log("Arquivo descriptografado salvo em:", caminhoArquivoDescriptografado);
