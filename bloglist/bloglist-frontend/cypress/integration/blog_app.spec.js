// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

const { func } = require("prop-types")

// 5.17: blogilistan end to end -testit, step1
describe('Blog ', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        let user = { username: "testi", password: "testi", name: "testi" }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })
    it('login form is shown', function() {
        cy.contains('Login')
        cy.contains('Create account')
        cy.contains('blogs')
    })
})

// 5.18: blogilistan end to end -testit, step2
describe('Login', function() {
    it('succeeds with correct credentials', function() {
        let user = { username: "testi", password: "testi" }
        cy.contains('Login').click()
        cy.get('#username').type(user.username)
        cy.get('#password').type(user.password)
        cy.contains('login').click()
        cy.contains('testi logged in')
    })
    it('fails with wrong credentials', function() {
        cy.contains('Create Blog').click()
        cy.contains('Logout').click()
        cy.contains('Login').click()
        cy.get('#username').type('testi')
        cy.get('#password').type('fail')
        cy.contains('login').click()
        cy.contains('Login failed, wrong username or password')
    })
})


describe('Blog app', function() {
    describe('When logged in', function() {
        beforeEach(function() {
            let user = { username: "testi", password: "testi" }
            cy.contains('Login').click()
            cy.get('#username').clear().type(user.username)
            cy.get('#password').clear().type(user.password)
            cy.contains('login').click()
        })
        afterEach(function() {
            cy.contains('Create Blog').click()
            cy.contains('Logout').click()
        })
        // 5.19: blogilistan end to end -testit, step3
        it('A blog can be created', function() {
            cy.contains('Create Blog').click()
            cy.get('#inputTitle').type('testaus')
            cy.get('#urlTitle').type('testing blog creation')
            cy.contains('save').click()
            cy.contains('testaus')
        })
        // 5.20: blogilistan end to end -testit, step4
        it('A blog can be liked', function() {
            cy.contains('Show').click()
            cy.contains('Like').click()
            cy.contains('Likes: 1')
        })
        // 5.21: blogilistan end to end -testit, step5
        it('A blog can be deleted', function() {
            cy.contains('Show').click()
            cy.contains('Delete blog').click()
        })
        it('Blogs can be ordered by likes', function() {
            cy.contains('Create Blog').click()
            cy.get('#inputTitle').type('number#2')
            cy.get('#urlTitle').type('number#2')
            cy.contains('save').click()
            cy.get('.blog')
            cy.contains('login').click()
        })
    })
})
