# Full NGINX Tutorial - Demo Project with Node.js, Docker

[![tumbnail](https://raw.githubusercontent.com/Darlley/nginx-tutorial/refs/heads/main/thumbnail.avif)](https://youtu.be/q8OleYuqntY)

Vídeo: https://youtu.be/q8OleYuqntY

Este é um servidor Node com Express que serve um site estático.

1. "Dockernizei" ele em `Dockerfile`
2. `docker-compose.yml` crie três instâncias (container) dele.
3. `nginx.conf` tem uma cópia das configurações do Nginx como Proxy.

É aqui que acontece toda a mágica: onde você faz todas as configurações do NGINX. Estes não são todas as diretivas (como são chamadas) e você pode apagar tudo e reescrever usando as configurações de que precisas. No nosso caso vamos reescrever algumas. 

1. https://nginx.org/en/docs/dirindex.html
2. https://nginx.org/en/docs/ngx_core_module.html

`worker_processes` é o numero de processos que executam a tarefa. Em processo de desenvolvimento pode ser 1, mas em produção geralmente se usa o mesmo número core de processamento do servidor (núcleos de CPU disponíveis), ou seja, vários processos em paralelo sem ter que esperar um processo completar sendo que existem núcleos disponíveis. E como não sabemos geralmente se define como “auto” (automático).

`events` é um contexto (bloco) de configuração, nesse caso delimitamos onde começa e quanto  eficiente ele deve ser.

`worker_connections`  define quantas conexões simultâneas cada processo deve lidar. Isso aumenta o uso da memória, são verias conexões abertas ao mesmo tempo

`http` é outro contexto (bloco) em que lidamos com a lógica de como a requisição do cliente será tratada e o que o nosso servidor fará com ela.

server é um bloco para lidar com o endereçamento da solicitação.

`listen` a porta.

`server_name` o domínio ou  endereço IP.

`location` define como o nginx deve lidar com a solicitação, estamos configurando como um Proxy com a diretiva `proxy_pass` para as três instâncias do servidor nodejs no Docker que são referenciadas como um cluster na diretiva `upstream`.

**SSL**

Para acessar a aplicação através do https:// devemos adicionar o protocolo SSL. Crie uma pasta específica para guardar as chaves. Agora dentro dela execute o comando:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt
```

Isto vai gerar duas chaves para validar o certificado SSL x509 válido por 365 dias e o local onde salvar as chaves publica e privada. A chave privada fica com o servidor nginx e a chave pública fica em todas as solicitações de requisições. O path da chave pública fica na diretiva `ssl_certificate` e o path da chave privada na diretiva `ssl_certificate_key`. (No path do windows é C:/etc…). 

Pronto. Acesse https://localhost:443. O navegador ainda não reconhece como sseguro por que é um certificado autogerado, mas funcionou, em ambiente de produção os certificados SSL/TLS precisam ser emitidos $$ por uma Autoridade Certificadora (CA). Se você quer uma alternativa gratuita, pode usar o Let's Encrypt.

O último servidor foi feito para que o NGINX redirecione uma solicitação http://localhost:8080 para https://localhost:443.