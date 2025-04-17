# Full NGINX Tutorial - Demo Project with Node.js, Docker

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