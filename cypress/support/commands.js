Cypress.Commands.add('login',(
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {},
  ) => {
    const login = () => {
        cy.visit('/login')
  
        cy.get('#id_userLoginId').type(user, {force: true})
        cy.get('#id_password').type(password)
        cy.get('button[type="submit"]').click()
        cy.get(':nth-child(2) > :nth-child(1) > .profile-link > .avatar-wrapper > .profile-icon')
          .click() 
    }
    const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
          .should('not.eq', '/login')  
    }

    const options = {
        cacheAcrossSpecs: true,
        validate,
    }
    
    if (cacheSession) {
        cy.session(user, login, options)
    } else {
        login()
    }

})
Cypress.Commands.add('logout', () => {
    const logout = () => {
        cy.visit('/login')
        cy.get('.account-dropdown-button').click()
        cy.contains('Sair da Netflix').click()  
              
    }
    logout()
})

