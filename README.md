# Projeto Integrador I em Big Data e Inteligência Analítica

O sistema desenvolvido visa automatizar o controle de ponto de funcionários usando cartões RFID. O processo de geração dos dados ocorre quando um funcionário aproxima seu cartão RFID de um leitor instalado no ponto de registro. Cada leitura do cartão é registrada com um timestamp e o identificador único do cartão, indicando a entrada, saída ou horário de almoço do funcionário.

## 1. Especificação do equipamento
### 1.1 Componentes
- Arduino UNO: Placa de microcontrolador.
- Módulo RFID: Para leitura dos cartões de identificação.
- LCD 16x2: Para exibir informações para o usuário.
- Modulo I2C: Para facilitar a conexão e comunicação do LCD.
- Buzzer: Para alertas sonoros.
- LED RGB: Para indicar status (Verde para sucesso, vermelho para erro e azul para aproximar).

### 1.2 Considerações finais
 Inicialmente o projeto utilizava um módulo para conexão Wi-fi. Contudo, o ambiente em que o mesmo ficaria, não permitia tal conexão.

## 2. Coleta dos Dados do Equipamento

### 2.1 Dicionário de Dados

| **Campo**           | **Descrição**                                          | **Tipo de Dados** | **Exemplo**          |
|---------------------|--------------------------------------------------------|-------------------|---------------------|
| `data`         | Data e hora da leitura do cartão                       | Timestamp         | `2024-09-15 08:30:00`|
| `nome_funcionario`    | Nome do funcionário                           | String           | `Lorem Ipsum`|

### 2.2 Problemas e desafios

Durante a implementação do sistema, foram enfrentados os seguintes desafios:

- **Leitura Falha de Cartões**: Alguns cartões RFID não foram lidos corretamente devido a interferências e distâncias variadas entre o cartão e o leitor.
- **Armazenamento de Dados**: O armazenamento inicial dos dados em arquivos CSV mostrou-se inadequado para a proposta inicial que era acompanhar via web os registros. Para isso, foi utilizado um banco de dados local.

Esses problemas foram abordados com a implementação de técnicas de validação e correção, além de ajustes no hardware e software.

### 2.3 Considerações Finais

O sistema de ponto RFID conseguiu automatizar o processo de registro de horários, proporcionando uma solução eficiente para o controle de presença. Contudo, ajustes contínuos são necessários para garantir a precisão das leituras e o armazenamento adequado dos dados.

## 3. Análise Exploratória e Visualização dos Dados

### 3.1 Introdução

A exploração e o conhecimento dos dados são cruciais para garantir a eficácia do sistema de controle de ponto. A análise exploratória ajuda a identificar padrões, anomalias e a qualidade geral dos dados coletados.

### 3.2 Análise Exploratória e Visualização de Dados

- **Tabelas**: A seguir estão as principais tabelas de análise dos dados coletados.

  | **data**       | **nome_funcionario** |
  |----------------|--------------------|
  | 2024-09-15     | Lorem Ipsum          |
  | 2024-09-15     | Lorem Ipsum          |
  | 2024-09-15     | Lorem Ipsum        |
  
  - **Outliers**: Foram observadas entradas de horário fora do padrão (por exemplo, entradas registradas fora do horário de expediente). Esses casos foram analisados e tratados conforme as políticas da empresa.

### 3.3 Limpeza e Tratamento dos Dados

As anomalias identificadas foram tratadas da seguinte maneira:

- **Outliers**: As entradas fora do padrão foram analisadas manualmente e ajustadas conforme as regras estabelecidas, ou foram excluídas se fossem identificadas como erros.

### 3.4 Resultados do Experimento

Os principais resultados incluem:

- **Precisão do Registro**: O sistema mostrou-se eficaz na captura e registro de entradas e saídas com alta precisão, após ajustes iniciais.
- **Problemas Resolvidos**: O sistema conseguiu resolver problemas de controle manual e de erros de registro, proporcionando uma visão clara dos horários dos funcionários.

### 3.5 Conclusão

O projeto do sistema de ponto RFID demonstrou sucesso na automação do controle de ponto. A análise dos dados revelou a eficiência do sistema e destacou áreas de melhoria para garantir registros precisos. As soluções adotadas foram eficazes para tratar anomalias e garantir a integridade dos dados.

