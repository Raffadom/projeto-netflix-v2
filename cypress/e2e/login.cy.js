describe('Netflix', () => {
  const user = Cypress.env('user_name')
  const password = Cypress.env('user_password')
  const options = { cacheSession: false }
  beforeEach( () => {
    cy.visit('/login')
  })
  
  it('preeenche campo [E-mail ou número de telefone] com e-mail válido e campo [Senha} com senha inválida, Então deve aparecer a mensagem de erro [Senha incorreta. Tente novamente ou redefina sua senha.]', () => {
  
    cy.get('#id_userLoginId').type(user, {force: true, log:false })
    cy.get('#id_password').type(1234)
    cy.get('button[type="submit"]').click()
    cy.get('.ui-message-contents')
      .should('be.visible')
      .and('contain', 'Senha incorreta. Tente novamente ou redefina sua senha.')  
  })
  it('preeenche campo [E-mail ou número de telefone] com e-mail inválido e campo [Senha} com senha inválida, Então deve aparecer a mensagem de erro [Desculpe, não encontramos uma conta com esse endereço de email. Tente novamente ou crie um nova conta.]', () => {
  
    cy.get('#id_userLoginId').type('joão-vitor@gmail,com', {force: true})
    cy.get('#id_password').type(1234)
    cy.get('button[type="submit"]').click()
    cy.get('.error')
      .should('be.visible')
    cy.get('.ui-message-contents')
      .should('contain', 'Desculpe, não encontramos uma conta com esse endereço de email. Tente novamente ou crie um nova conta.')  
  })
  it('preenche campo [E-mail ou número de telefone] com e-mail inválido e campo [Senha] com senha válida, Então deve aparecer a mensagem de erro [Desculpe, não encontramos uma conta com esse endereço de email. Tente novamente ou crie um nova conta.]', () => {
    cy.get('#id_userLoginId').type('joão-vitor@gmail,com', {force: true})
    cy.get('#id_password').type(password, { log: false })
    cy.get('button[type="submit"]').click()
    cy.get('.error')
      .should('be.visible')
    cy.get('.ui-message-contents')
      .should('contain', 'Desculpe, não encontramos uma conta com esse endereço de email. Tente novamente ou crie um nova conta.')
  })
  it('deixa os campos obrigatórios em branco, clica em [Entrar], Então deve aparecer a mensagem de erro [A senha deve ter entre 4 e 60 caracteres.]', () => {
  
    cy.get('button[type="submit"]').click()
    cy.get('.error')
      .should('be.visible')
    cy.get('.nfEmailPhoneInput > .inputError') 
      .should('contain', 'Informe um email ou número de telefone válido.')
    cy.get('.nfPasswordInput > .inputError')  
      .should('contain', 'A senha deve ter entre 4 e 60 caracteres.')
   })

  it('preeenche os campos obrigatórios com e-mail válido e senha válida, clica no perfil [Rafael], Então deve entrar na pagina do [Browse]', () => {
   
    cy.get('#id_userLoginId').type(user, {force: true , log: false})
    cy.get('#id_password').type(password, { log: false })
    cy.get('button[type="submit"]').click()
    cy.get(':nth-child(2) > :nth-child(1) > .profile-link > .avatar-wrapper > .profile-icon')
      .click()   
    cy.url()
      .should('be.equal', 'https://www.netflix.com/browse')
    
  })
  

})