const { publicEncrypt, constants } = require("crypto");
const { readFileSync, writeFileSync, existsSync } = require("fs");
const path = require("path");

const caminhoArquivoTexto = path.join(__dirname, "segredo.txt");
const caminhoArquivoCriptografado = path.join(__dirname, "segredo-criptografado");
const caminhoAbsolutoChave = path.join(
  __dirname,
  "certificado",
  "chave-publica.pem"
);

if (!existsSync(caminhoArquivoTexto)) {
  console.error("O arquivo de texto nao foi encontrado:", caminhoArquivoTexto);
  process.exit(1);
}

if (!existsSync(caminhoAbsolutoChave)) {
  console.error("A chave publica do repositorio nao foi encontrada:", caminhoAbsolutoChave);
  process.exit(1);
}

const texto = readFileSync(caminhoArquivoTexto, "utf8");
const chavePublica = readFileSync(caminhoAbsolutoChave, "utf8");

const textoCriptografado = publicEncrypt(
  {
    key: chavePublica,
    padding: constants.RSA_PKCS1_OAEP_PADDING,
  },
  Buffer.from(texto, "utf8")
).toString("base64");

writeFileSync(caminhoArquivoCriptografado, textoCriptografado, "utf8");

console.log("Arquivo criptografado salvo em:", caminhoArquivoCriptografado);
