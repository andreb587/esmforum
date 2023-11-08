const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});


test('Testando cadastro de respostas', () => {
  const id1 = modelo.cadastrar_pergunta('1 + 1 = ?');
  const id2 = modelo.cadastrar_pergunta('2 + 2 = ?');
  const id3 = modelo.cadastrar_pergunta('3 + 3 = ?');
  modelo.cadastrar_resposta(id1, '2');
  modelo.cadastrar_resposta(id1, '3');
  modelo.cadastrar_resposta(id2, '4');
  modelo.cadastrar_resposta(id3, '5');

  const perguntas = modelo.listar_perguntas();
  expect(perguntas[0].num_respostas).toBe(2);
  expect(perguntas[1].num_respostas).toBe(1);
  expect(perguntas[2].num_respostas).toBe(1);
  
});


test('Testando busca de perguntas e respostas por ID', () => {
  const id1 = modelo.cadastrar_pergunta('1 + 1 = ?');
  const id2 = modelo.cadastrar_resposta(id1, '2');
  const id3 = modelo.cadastrar_pergunta('1 + 2 = ?');

  const pergunta = modelo.get_pergunta(id1);
  expect(pergunta.texto).toBe('1 + 1 = ?');

  const respostas = modelo.get_respostas(id1);
  expect(respostas.length).toBe(1);
  expect(respostas[0].texto).toBe('2');

  const respostas2 = modelo.get_respostas(id3);
  expect(respostas2.length).toBe(0);
});
