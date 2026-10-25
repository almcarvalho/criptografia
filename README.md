# Desafio: uma mensagem que só eu posso abrir 🔐

Como proteger uma mensagem mesmo quando outras pessoas podem ver o que está sendo enviado? Neste desafio, vamos entender isso na prática usando **criptografia assimétrica** com Node.js.

Eu já gerei meu par de chaves e vou compartilhar minha **chave pública** com vocês. Sua missão é usar essa chave para cifrar uma mensagem e me enviar o resultado. A mensagem poderá ser decifrada com a **chave privada correspondente**, que fica somente comigo.

## Objetivos

- Treinar criptografia com um exemplo prático.
- Entender a diferença entre chave pública e chave privada.
- Cifrar uma mensagem e recuperar seu conteúdo com o par de chaves correto.
- Compreender o papel da criptografia na proteção das informações em comunicações seguras.

## Como funciona?

A criptografia assimétrica usa duas chaves relacionadas:

- **Chave pública:** pode ser compartilhada. Neste projeto, serve para cifrar a mensagem.
- **Chave privada:** deve permanecer em segredo. Serve para decifrar a mensagem cifrada com a chave pública correspondente.

```text
Você + minha chave pública + sua mensagem
                    ↓ cifrar
             Mensagem cifrada
                    ↓ enviar para mim
       Minha chave privada → mensagem original
```

Conhecer a chave pública não permite, na prática, calcular a chave privada e ler a mensagem com os recursos computacionais disponíveis. A proteção depende de manter a chave privada secreta e de usar algoritmos e implementações adequados.

Esse exemplo demonstra a confidencialidade. Ele não comprova quem enviou a mensagem: qualquer pessoa com minha chave pública pode cifrar algo para mim. Também é necessário confirmar que a chave pública recebida realmente é minha.

Em comunicações seguras como HTTPS, a criptografia assimétrica participa da autenticação e do estabelecimento de segredos compartilhados; a transmissão dos dados usa criptografia simétrica. Aqui, ciframos uma mensagem curta diretamente com RSA para aprender o conceito.

## Preparação

Instale o **Node.js** no computador. Os scripts usam módulos nativos, portanto não é necessário instalar dependências com `npm install`.

Abra o terminal na pasta que contém os arquivos `.js` e confira a instalação:

```bash
node --version
```

## Como participar

1. Baixe o projeto e use minha chave pública em `certificado/chave-publica.pem`.
2. Crie o arquivo `segredo.txt` na mesma pasta de `cripto.js` e escreva uma mensagem curta.
3. Execute:

   ```bash
   node cripto.js
   ```

4. Envie para mim o arquivo **`segredo-criptografado`** gerado, ou seu conteúdo completo. Não envie `segredo.txt`, pois ele contém sua mensagem original!

**Não execute `certificado.js` para participar:** você precisa usar minha chave pública, e não gerar um novo par de chaves.

O script usa RSA de 2048 bits com preenchimento OAEP. Na configuração atual, a mensagem pode ter até **214 bytes** em UTF-8; letras acentuadas e emojis podem ocupar mais de um byte. O resultado é salvo em Base64, uma representação textual dos bytes cifrados. Base64 sozinho não é criptografia.

## Como eu abro sua mensagem

Com o arquivo recebido salvo como `segredo-criptografado` e minha chave privada em `certificado/chave-privada.pem`, executo:

```bash
node descripto.js
```

O conteúdo original será gravado em `segredo-descriptografado`. Sem a chave privada correspondente, o participante não conseguirá abrir a mensagem cifrada para mim.

## Como testar com seu próprio par de chaves

Use uma pasta separada, copie os três scripts para ela e execute:

```bash
node certificado.js
```

Esse comando cria a pasta `certificado` com:

- `chave-publica.pem`: pode ser compartilhada.
- `chave-privada.pem`: deve ficar em segredo.

Apesar do nome `certificado.js`, o script gera um **par de chaves RSA em formato PEM**, e não certificados digitais X.509. Ele interrompe a execução se alguma das chaves já existir, para evitar sobrescrevê-las.

Crie `segredo.txt` nessa pasta com sua mensagem de teste. Depois, execute:

```bash
node cripto.js
node descripto.js
```

Compare `segredo.txt` com `segredo-descriptografado`: os conteúdos devem ser iguais. Essa cópia serve para seus testes; para me enviar uma mensagem, use minha chave pública.

## Cuidados com os arquivos

O `.gitignore` exclui a chave privada e os arquivos de mensagem em texto aberto. A chave pública pode fazer parte do repositório.

O `.gitignore` não remove arquivos de commits anteriores. Se uma chave privada já foi publicada, considere-a comprometida: gere um novo par e compartilhe a nova chave pública. Remover o arquivo do histórico não torna a chave antiga secreta novamente.

Este projeto é um exercício de aprendizado. Use mensagens de teste, sem dados sensíveis reais.
