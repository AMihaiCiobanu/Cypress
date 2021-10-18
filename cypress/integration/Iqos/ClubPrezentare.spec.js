/// <reference types="cypress" />
const Field1 =
  ":nth-child(1) > .LoginInput_field__23by1 > .LoginInput_input__1EeLa";
const Field2 =
  ":nth-child(2) > .LoginInput_field__23by1 > .LoginInput_input__1EeLa";
const Field3 =
  ":nth-child(3) > .LoginInput_field__23by1 > .LoginInput_input__1EeLa";
const InscrieCodButton = ".Form_buttons__17lkQ > :nth-child(3)";
const RevomeField = ":nth-child(1) > .Form_removeInput__2E-YK > img";
beforeEach(() => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});

describe("Club Login", { retries: { runMode: 2, openMode: 2 } }, () => {
  context("GUI", () => {
    it("mac-13", () => {
      cy.viewport("macbook-13");
      cy.visit("/login");
      cy.get("#agegate-yes").click();
      cy.contains("ACCEPT TOATE").click();
      //1
      cy.url().should("include", "/club/login");
      //2
      //cy.document().toMatchImageSnapshot({ name: "LoginMac13" });
      cy.percySnapshot("all page");

      //3
      cy.get(".loginWrapper > h3")
        .should("have.text", "Intră în cont, folosind datele din IQOS.ro.")
        .and("have.css", "color", "rgb(255, 255, 255)")
        .and("have.css", "font-size", "36px");
      cy.percySnapshot();
      //3
      cy.contains("Adresa de e-mail")
        .should("have.css", "color", "rgb(255, 255, 255)")
        .and("have.css", "font-size", "14px");
      //3
      cy.contains("Parola")
        .should("have.css", "color", "rgb(255, 255, 255)")
        .and("have.css", "font-size", "14px");
      //3
      cy.contains("Ai uitat parola?")
        .should("have.css", "color", "rgb(255, 255, 255)")
        .and("have.css", "font-size", "14px");
      //4
      cy.contains("Conectează-te")
        .should("have.css", "background-color", "rgb(214, 167, 111)")
        .and("have.css", "color", "rgb(255, 255, 255)")
        .and("have.css", "text-align", "center");
      cy.contains("Înregistrează-te pe IQOS.RO").should("be.visible");
    });
  });

  describe("Functional", () => {
    it("mac-13", () => {
      cy.visit("/login");
      cy.get("#agegate-yes").click();
      cy.contains("ACCEPT TOATE").click();

      ///Check response on entering invalid username and password test-2
      cy.get(Field1)
        .clear()
        .type("gfttest.prod@gmail.com");
      cy.get(Field2).type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date",
        { timeout: 6000 }
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 1 Login" });

      ///Check response on entering invalid username and valid password test-3
      cy.get(Field2)
        .clear()
        .type("fttest.prod02@gmail.com");
      cy.get(Field3).type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date"
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 2 Login" });

      ///Check response on entering valid username and invalid password test-4
      cy.get(Field2)
        .clear()
        .type("gfttest.prod02@gmail.com");
      cy.get(Field3)
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date"
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 3 Login" });

      ///Check response on entering invalid username and valid password test-5
      cy.get(Field2)
        .clear()
        .type("gfttest.prod02@gmail.com");
      cy.get(Field3)
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date"
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 4 Login" });

      ///Check response on entering invalid username and valid password test-6 Case sensitive
      cy.get(Field2)
        .clear()
        .type("Gfttest.prod02@gmail.com");
      cy.get(Field3)
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date"
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 5 Login" });

      ///Check response when username and password  field are empty and login is pressed test-7
      cy.contains("Conectează-te").click();

      cy.document().toMatchImageSnapshot({ name: "Error message 6 Login" });

      ///Check response when username field is empty and login is pressed test-8
      cy.get(Field2).clear();
      cy.get(Field3)
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Câmpul email trebuie să fie o adresă de e-mail validă."
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 7 Login" });

      ///Check response when password field is empty and login is pressed test-9
      cy.get(Field2).clear();
      cy.get(Field3)
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Câmpul email trebuie să fie o adresă de e-mail validă."
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 8 Login" });

      ///"Check response on entering invalid username "@" and valid password test-10
      cy.get(Field2)
        .clear()
        .type("gfttest.prod02gmail.com");
      cy.get(Field3)
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Câmpul email trebuie să fie o adresă de e-mail validă."
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 9 Login" });

      ///Check response on entering valid unername and password test-1
      cy.get(Field2)
        .clear()
        .type("gfttest.prod02@gmail.com");
      cy.get(Field3)
        .clear()
        .type("Parola123!");
      cy.contains("Conectează-te").click();
    });

    it("iPhone-8", () => {
      cy.viewport("iphone-8");
      cy.visit("/login");
      cy.get("#agegate-yes").click();
      cy.contains("ACCEPT TOATE").click();

      ///Check response on entering invalid username and password test-2
      cy.get(Field1)
        .clear()
        .type("gfttest.prod@gmail.com");
      cy.get(Field2).type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date",
        { timeout: 6000 }
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({
        name: "Error message 1 Login iPhone-8",
      });

      ///Check response on entering invalid username and valid password test-3
      cy.get(Field2)
        .clear()
        .type("fttest.prod02@gmail.com");
      cy.get(Field3).type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date"
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({
        name: "Error message 2 Login iPhone-8",
      });

      ///Check response on entering valid username and invalid password test-4
      cy.get(Field2)
        .clear()
        .type("gfttest.prod02@gmail.com");
      cy.get(Field3)
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date"
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({
        name: "Error message 3 Login iPhone-8",
      });

      ///Check response on entering invalid username and valid password test-5
      cy.get(Field2)
        .clear()
        .type("gfttest.prod02@gmail.com");
      cy.get(Field3)
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date"
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({
        name: "Error message 4 Login iPhone-8",
      });

      ///Check response on entering invalid username and valid password test-6 Case sensitive
      cy.get(Field2)
        .clear()
        .type("Gfttest.prod02@gmail.com");
      cy.get(Field3)
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date"
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({
        name: "Error message 5 Login iPhone-8",
      });

      ///Check response when username and password  field are empty and login is pressed test-7
      cy.contains("Conectează-te").click();
      cy.document().toMatchImageSnapshot({
        name: "Error message 6 Login iPhone-8",
      });

      ///Check response when username field is empty and login is pressed test-8
      cy.get(Field2).clear();
      cy.get(Field3)
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Câmpul email trebuie să fie o adresă de e-mail validă."
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({
        name: "Error message 7 Login iPhone-8",
      });

      ///Check response when password field is empty and login is pressed test-9
      cy.get(Field2).clear();
      cy.get(Field3)
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Câmpul email trebuie să fie o adresă de e-mail validă."
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({
        name: "Error message 8 Login iPhone-8",
      });

      ///"Check response on entering invalid username "@" and valid password test-10
      cy.get(Field2)
        .clear()
        .type("gfttest.prod02gmail.com");
      cy.get(Field3)
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Câmpul email trebuie să fie o adresă de e-mail validă."
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({
        name: "Error message 9 Login iPhone-8",
      });

      ///Check response on entering valid unername and password test-1
      cy.get(Field2)
        .clear()
        .type("gfttest.prod02@gmail.com");
      cy.get(Field3)
        .clear()
        .type("Parola123!");
      cy.contains("Conectează-te").click();
    });
  });
});

describe(
  "Club GUI/Functional",
  { retries: { runMode: 2, openMode: 2 } },
  () => {
    it.only("Inscrie cod", () => {
      cy.visit("www.iqos.ro/club");
      cy.loginLiveS();
      cy.scrollTo("top");
      cy.contains("Acumulează", { timeout: 8000 }).click();
      cy.contains("Înscrie coduri HEETS").click();

      cy.get(InscrieCodButton).should("not.be.enabled");
      cy.get("#code-0").type("12345as");
      cy.get(InscrieCodButton).should("not.be.disabled");

      cy.get("#code-0").should("be.visible");
      cy.get("#code-1").should("not.exist");
      cy.contains("Adaugă încă un cod").click();
      cy.get("#code-1").should("be.visible");
      cy.get(RevomeField).click();
      cy.get("#code-1").should("not.exist");

      cy.scrollTo("top");
      cy.contains("Acumulează", { timeout: 8000 }).click();
      cy.contains("Înscrie coduri HEETS").click();
      cy.contains("Cod HEETS")
        .click()
        .type("123123");
      cy.contains("Înscrie cod").click();
      cy.contains("Cod greșit", { timeout: 4000 })
        .should("be.visible")
        .and("have.css", "color", "rgb(30, 30, 30)");
      cy.get(".ant-notification-notice").should("be.visible");
      cy.get(".anticon > svg").click();
    });
  }
);
