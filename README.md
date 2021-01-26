# Recuperação de senha

**RF-Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF-Requisitos não funcionais**

- Utilizar Mailtrap para testar envio em ambientes de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano(background job);

**RN-Regras de Negocio**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- o usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização de perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RNF**

**RN**

- O usuário não pode alterar seu email para email já utilizado;
- Para atualizar sua senha, o usuário deve informar sua senha antiga;
- Para atualizar sua senha, o usuário deve confirmar sua nova senha

# Painel do prestador

**RF**

- O usuario deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenados no MongoDB;
- As notificações do prestador devem ser enviados em tempo real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar os horarios disponiveis em um dia especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenado em cache;

**RN**

- Cada agendamento deve durar 1h extamente;
- Os agendamentos devem estar disponiveis entre 8h às 18h(primeira às 8h, último às 17h)
- O usuario não pode agendar em um horario já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuario não pode agendar serviços consigo mesmo;
