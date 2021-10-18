// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// This is a parent command --
Cypress.Commands.add("loginLiveS", (email, password) => {
  cy.get("#agegate-yes").click();
  cy.contains("Intră în cont").click();
  cy.get("#onetrust-accept-btn-handler").click();
  cy.get("#login-email").type("sherlock.holmespm@gmail.com");
  cy.get("#login-form-password").type("GrapefruiT123!@#");
  cy.get(".login-form-button").click();
});

Cypress.Commands.add("loginStage", (email, password) => {
  cy.visit("https://pwa-stage9.gd.ro/club/", {
    failOnStatusCode: false,
  });
  cy.viewport("macbook-13");
  cy.get("#agegate-yes").click();
  cy.contains("Intră în cont").click();
  cy.get(
    ":nth-child(1) > .LoginInput_field__23by1 > .LoginInput_input__1EeLa"
  ).type("sherlock.holmespm@gmail.com"); //gold
  cy.get(
    ":nth-child(2) > .LoginInput_field__23by1 > .LoginInput_input__1EeLa"
  ).type("GrapefruiT123!@#");
  cy.get(".AuthButton_button__2znkw").click();
});

import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";

addMatchImageSnapshotCommand();
addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: "percent", // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: "viewport", // capture viewport in screenshot
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
