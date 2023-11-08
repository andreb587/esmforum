describe('Segundo teste end-to-end', () => {
    it('Cadastra uma resposta e verifica se ela é listada', () => {
        cy.visit('localhost:3000');
        
        //cy.wait(2000);
        cy.get('#textarea-pergunta').type('2+2');
        cy.get('#btn-pergunta').click();
        cy.get('#tabela-perguntas').contains('2+2');
    
        cy.visit('localhost:3000/resposta/1');
        cy.get('#textarea-resposta').type('4');
        cy.get('#btn-resposta').click();
        cy.get('#tabela-respostas').contains('4');
    
        
    });
  });

  
  
  
  
  