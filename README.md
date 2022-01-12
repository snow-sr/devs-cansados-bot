# Olá dev! 
 
<li>
   <a href="https://discordjs.guide/#before-you-begin">Link da documentação do módulo Discord.js</a>
</li>

É recomendável olhar as abas "Creating your bot", e "Interactions" pra ter uma noção do que já está feito aqui e entender como mais ou menos tudo funciona.
<hr>

## Para iniciar o projeto em sua máquina, faça a seguinte mandinga:
<ul>
  <li>Arranje o arquivo que contém os tokens do bot (como fazer isso? olhe o discord)</li>
  <li>Baixe o repositório e utilize <code>npm i</code> para baixar as dependências necessárias</li>
  <li>execute <code>npm run dev</code> para rodar o projeto localmente</li>
  <li>Teste suas mudanças no servidor: <a href="https://discord.gg/NyDvnpa4MG">Test-Discord-bot</a></li>
</ul>

<hr>

## Como adicionar novas features?

Para adicionar novas features que são baseadas em slash commands, siga o exemplo dos comandos já existentes. Fuçe a documentação para utilizar o módulo ao máximo.
<br>
<br>
Após criar um arquivo com seu comando e ter deixado ele no padrão dos outros, realize: <code>npm run deployCommands</code>
<br>
E teste sua nova criação.
<br><br>
**Disclaimer: Não é necessário rodar quando for realizada alterações na parte lógica de algum slash command, apenas quando modificado o nome/descrição do comando**

<hr>
