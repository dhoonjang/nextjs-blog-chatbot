describe('챗봇 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/search');
  });

  it('메시지 목록', () => {
    cy.contains('무엇이든 물어보세요!');
    cy.get('[data-cy*="message-"]').should('have.length', 1);
    cy.get('input').type('안녕하세요');
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy*="message-"]').should('have.length', 3);
  });

  it('대화 초기화', () => {
    cy.get('input').type('안녕하세요');
    cy.get('button[type="submit"]').click();
    cy.contains('생각중...').should('exist');
    cy.get('[data-cy*="message-"]').should('have.length', 3);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.contains('생각중...').should('not.exist');
    cy.get('input').should('have.value', '');
    cy.contains('대화 초기화').click();
    cy.on('window:confirm', cy.stub().returns(true));
    cy.get('[data-cy*="message-"]').should('have.length', 1);
  });
});
