describe('Blog App', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('log in to application')
  })
})