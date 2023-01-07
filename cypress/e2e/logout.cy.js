describe('Netflix', () => {
    beforeEach( () => {
        cy.visit('/login')
        cy.login()
        
    })

    it('successfully', () => {
        
        cy.logout()

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/logout`)
        
       

    })

})