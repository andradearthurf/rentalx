# Cadastro de Carro

**RF**

* Deve ser possível cadastrar um novo carro.


**RN**

* Não deve ser possível cadastrar um carro com uma placa já existente.

* O carro deve ser cadastrado, com disponibilidade, por padrão.

* O usuário responsável pelo cadastrado deve ser um usuário administrador.


# Listagem de Carros

**RF**

* Deve ser possível listar todos os carros disponíveis.

* Deve ser possível listar todos os carros disponíveis pelo nome da categoria.

* Deve ser possível listar todos os carros disponíveis pelo nome da marca.

* Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**

* O usuário não precisa estar logado no sistema.


# Cadastro de Especificação no carro

**RF**

* Deve ser possível cadastrar uma especificação para um carro.

* Deve ser possível listar todas as especificações.

* Deve ser possível listar todos os carros.

**RN**

* Não deve ser possível cadastrar uma especificação para um carro não cadastrado.

* Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

* O usuário responsável pelo cadastrado deve ser um usuário administrador.


# Cadastro de imagens do carro

**RF**

* Deve ser possível cadastrar a imagem do carro.

* Deve ser possível listar todos os carros

**RNF**

* Utilizar o multer para upload dos arquivos.

**RN**

* O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.

* O usuário responsável pelo cadastrado deve ser um usuário administrador.


# Aluguel de carro

**RF**

* Deve ser possível cadastrar um aluguel.

**RN**

* O aluguel deve ter duração mínima de 24 horas.

* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.

* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

* O Usuário deve estar logado na aplicação.


##

**RF** => Requisitos Funcionais 

**RNF** => Requisitos não Funcionais 

**RN** => Regra de Negócio

##
