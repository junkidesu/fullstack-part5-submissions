describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', {
      username: 'someusername',
      name: 'Some Full Name',
      password: 'somepassword'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('someusername')
      cy.get('#password').type('somepassword')
      cy.get('#login-button').click()

      cy.contains('logged in as someusername')
      cy.get('.error').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrongusername')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'someusername',
        password: 'somepassword'
      })
        .then(response => {
          localStorage.setItem('loggedInUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('a new blog can be created', function() {
      cy.contains('blogs')

      cy.get('.show-button').click()

      cy.get('#title').type('New Title')
      cy.get('#author').type('New Author')
      cy.get('#url').type('newurl')

      cy.get('#submit-button').click()

      cy.get('#blogs').contains('New Title New Author')
    })
  })
})