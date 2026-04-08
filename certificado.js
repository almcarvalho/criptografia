const { generateKeyPairSync } = require("crypto");
const { writeFileSync, existsSync, mkdirSync } = require("fs");
const path = require("path");

const certificateDir = path.join(__dirname, "certificado");
const privateKeyPath = path.join(certificateDir, "chave-privada.pem");
const publicKeyPath = path.join(certificateDir, "chave-publica.pem");

mkdirSync(certificateDir, { recursive: true });

if (existsSync(privateKeyPath) || existsSync(publicKeyPath)) {
  console.error(
    "Uma ou ambas as chaves ja existem na pasta certificado. Remova os arquivos existentes antes de gerar novas chaves."
  );
  process.exit(1);
}

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

writeFileSync(publicKeyPath, publicKey, "utf8");
writeFileSync(privateKeyPath, privateKey, "utf8");

console.log("Chave publica salva em:", publicKeyPath);
console.log("Chave privada salva em:", privateKeyPath);
