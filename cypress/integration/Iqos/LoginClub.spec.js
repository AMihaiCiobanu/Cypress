/// <reference types="cypress" />

beforeEach(() => {
  Cypress.Cookies.preserveOnce();
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});

describe("Redirect", { retries: { runMode: 2, openMode: 2 } }, () => {
  it("Redirect/evenimente-qreator+", () => {
    cy.visit("https://www.iqos.ro/club/evenimente-qreator");
    cy.get("#agegate-yes").click(); /// assert agregate
    cy.contains("Intră în cont").click();
    cy.url().should("include", "/auth-loginform?loyalty=1"); ///assert url
    cy.get("#onetrust-accept-btn-handler").click(); ///clicl accept toate
    cy.get("#login-email").type("sherlock.holmespm@gmail.com"); ///type email
    cy.get("#login-form-password").type("GrapefruiT123!@#"); ///type password
    cy.get(".login-form-button").click(); ///click login
    cy.url().should("include", "/evenimente-qreator", { timeout: 10000 });
    cy.wait(1000);
    cy.document().toMatchImageSnapshot();

    cy.get(".PrimaryPageHeading_textContainer__3m4IT").should("be.visible");

    cy.get(".PrimaryPageHeading_imageHeader__2SEBm").should("be.visible");

    cy.get(".QreatorEvents_imgWrapper__2Aahl").should("be.visible");

    //cy.get(".QreatorEvents_listEvents__1lpg1").should("be.visible");//evenimente

    cy.get(".Footer_footer__7dIj9").should("be.visible");

    cy.get(".QreatorEvents_wrapper__12fmr").should("be.visible");
  });

  it("Redirect /club", () => {
    cy.visit("https://www.club.iqos.ro");
    cy.url().should("include", "/club/");
    cy.get("#agegate-yes").click();
    cy.contains("ACCEPT TOATE").click();
    cy.contains("Intră în cont").click();
    cy.url().should("include", "/auth-loginform?loyalty=1");
  });
});

describe("Login", () => {
  describe("GUI", () => {
    it("Mac-13", () => {
      cy.visit("/login");
      cy.url().should("include", "/club/login");
      cy.get("#agegate-yes").click();
      cy.contains("ACCEPT TOATE").click();
      cy.wait(1000);
      cy.get(".Login_logo__2c6wt").should("be.visible");
      cy.document().toMatchImageSnapshot();

      cy.get(".loginWrapper > h3")
        .should("have.text", "Intră în cont, folosind datele din IQOS.ro.")
        .and("have.css", "color", "rgb(255, 255, 255)")
        .and("have.css", "font-weight", "300")
        .and("have.css", "font-size", "36px");

      cy.contains("Ai uitat parola?")
        .should("have.css", "color", "rgb(255, 255, 255)")
        .and("have.css", "font-size", "14px")
        .and("have.css", "display", "inline-block")
        .and("be.visible");

      cy.contains("Adresa de e-mail")
        .should("have.css", "color", "rgb(255, 255, 255)")
        .and("have.css", "font-size", "14px");

      cy.contains("Parola").should("have.css", "color", "rgb(255, 255, 255)");

      cy.contains("Înregistrează-te pe IQOS.RO").should("be.visible");

      cy.contains("Conectează-te")
        .should("be.visible")
        .and("have.css", "background-color", "rgb(214, 167, 111)")
        .and("have.css", "color", "rgb(255, 255, 255)")
        .and("have.css", "text-align", "center");
    });

    it("iPhone-7", () => {
      cy.viewport("iphone-7");
      cy.visit("/login");
      cy.get("#agegate-yes").click();
      cy.contains("ACCEPT TOATE").click();
      cy.wait(1000);
      cy.document().toMatchImageSnapshot();
    });

    it("iPhone-12pro-max", () => {
      cy.viewport(428, 926);
      cy.visit("/login");
      cy.get("#agegate-yes").click();
      cy.contains("ACCEPT TOATE").click();
      cy.wait(1000);
      cy.document().toMatchImageSnapshot();
    });

    it("iPad-11", () => {
      cy.viewport(834, 1194);
      cy.visit("/login");
      cy.get("#agegate-yes").click();
      cy.contains("ACCEPT TOATE").click();
      cy.wait(1000);
      cy.document().toMatchImageSnapshot();
    });

    it("iPad-Pro-10.5", () => {
      cy.viewport(768, 1024);
      cy.visit("/login");
      cy.get("#agegate-yes").click();
      cy.contains("ACCEPT TOATE").click();
      cy.wait(1000);
      cy.document().toMatchImageSnapshot();
    });

    it("iPad-Pro-12.9", () => {
      cy.viewport(1024, 1366);
      cy.visit("/login");
      cy.get("#agegate-yes").click();
      cy.contains("ACCEPT TOATE").click();
      cy.wait(1000);
      cy.document().toMatchImageSnapshot();
    });
  });

  describe("Functional", () => {
    it("mac-13", () => {
      cy.visit("/login");
      cy.get("#agegate-yes").click();
      cy.contains("ACCEPT TOATE").click();

      ///Check response on entering invalid username and password test-2
      cy.get("[data-cy=email]")
        .clear({ force: true })
        .type("gfttest.prod@gmail.com");
      cy.get("[data-cy=password]").type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date",
        { timeout: 6000 }
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 1 Login" });

      ///Check response on entering invalid username and valid password test-3
      cy.get("[data-cy=email]")
        .clear()
        .type("fttest.prod02@gmail.com");
      cy.get("[data-cy=password]").type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date"
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 2 Login" });

      ///Check response on entering valid username and invalid password test-4
      cy.get("[data-cy=email]")
        .clear()
        .type("gfttest.prod02@gmail.com");
      cy.get("[data-cy=password]")
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date"
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 3 Login" });

      ///Check response on entering invalid username and valid password test-5
      cy.get("[data-cy=email]")
        .clear()
        .type("gfttest.prod02@gmail.com");
      cy.get("[data-cy=password]")
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date"
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 4 Login" });

      ///Check response on entering invalid username and valid password test-6 Case sensitive
      cy.get("[data-cy=email]")
        .clear()
        .type("Gfttest.prod02@gmail.com");
      cy.get("[data-cy=password]")
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date"
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 5 Login" });

      ///Check response when username and password  field are empty and login is pressed test-7
      cy.get("[data-cy=email]").clear();
      cy.get("[data-cy=password]").clear();
      cy.contains("Conectează-te").click();
      cy.contains("Câmpul email trebuie să fie o adresă de e-mail validă.", {
        timeout: 10000,
      }).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 6 Login" });

      ///Check response when username field is empty and login is pressed test-8
      cy.get("[data-cy=email]").clear();
      cy.get("[data-cy=password]")
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Câmpul email trebuie să fie o adresă de e-mail validă."
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 7 Login" });

      ///Check response when password field is empty and login is pressed test-9
      cy.get("[data-cy=email]").clear();
      cy.get("[data-cy=password]")
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Câmpul email trebuie să fie o adresă de e-mail validă."
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 8 Login" });

      ///"Check response on entering invalid username "@" and valid password test-10
      cy.get("[data-cy=email]")
        .clear()
        .type("gfttest.prod02gmail.com");
      cy.get("[data-cy=password]")
        .clear()
        .type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Câmpul email trebuie să fie o adresă de e-mail validă."
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({ name: "Error message 9 Login" });

      ///Check response on entering valid unername and password test-1
      cy.get("[data-cy=email]")
        .clear()
        .type("gfttest.prod02@gmail.com");
      cy.get("[data-cy=password]")
        .clear()
        .type("Parola123!");
      cy.get(".MuiSvgIcon-root > path").click();
      cy.contains("Intră în cont")
        .should("be.visible")
        .click();
    });

    it("iPhone-8", () => {
      cy.viewport("iphone-8");
      cy.visit("/login");
      cy.get("#agegate-yes").click();
      cy.contains("ACCEPT TOATE").click();

      ///Check response on entering invalid username and password test-2
      cy.get("[data-cy=email]")
        .clear()
        .type("gfttest.prod@gmail.com");
      cy.get("[data-cy=password]").type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date",
        { timeout: 6000 }
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({
        name: "Error message 1 Login iPhone-8",
      });

      ///Check response on entering invalid username and valid password test-3
      cy.get("[data-cy=email]")
        .clear()
        .type("fttest.prod02@gmail.com");
      cy.get("[data-cy=password]").type("*******");
      cy.contains("Conectează-te").click();
      cy.contains(
        "Adresa de email sau parola sunt invalide. Vă rugăm să încercați cu alte date"
      ).should("be.visible");
      cy.document().toMatchImageSnapshot({
        name: "Error message 2 Login iPhone-8",
      });

      ///Check response on entering valid username and invalid password test-4
      cy.get("[data-cy=email]")
        .clear()
        .type("gfttest.prod02@gmail.com");
      cy.get("[data-cy=password]")
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
      cy.get("[data-cy=email]")
        .clear()
        .type("gfttest.prod02@gmail.com");
      cy.get("[data-cy=password]")
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
      cy.get("[data-cy=email]")
        .clear()
        .type("Gfttest.prod02@gmail.com");
      cy.get("[data-cy=password]")
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
      cy.get("[data-cy=email]").clear();
      cy.get("[data-cy=password]").clear();
      cy.contains("Conectează-te").click();
      cy.contains("Câmpul email trebuie să fie o adresă de e-mail validă.");
      cy.document().toMatchImageSnapshot({
        name: "Error message 6 Login iPhone-8",
      });

      ///Check response when username field is empty and login is pressed test-8
      cy.get("[data-cy=email]").clear();
      cy.get("[data-cy=password]")
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
      cy.get("[data-cy=email]").clear();
      cy.get("[data-cy=password]")
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
      cy.get("[data-cy=email]")
        .clear()
        .type("gfttest.prod02gmail.com");
      cy.get("[data-cy=password]")
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
      cy.get("[data-cy=email]")
        .clear()
        .type("gfttest.prod02@gmail.com");
      cy.get("[data-cy=password]")
        .clear()
        .type("Parola123!");
      cy.get(".MuiSvgIcon-root > path").click();
    });
  });
});

describe("Nelogat", { retries: { runMode: 2, openMode: 2 } }, () => {
  it("mac-13", () => {
    cy.visit("/");
    cy.get("#agegate-yes").click();
    cy.contains("ACCEPT TOATE").click();
    cy.wait(1000);
    cy.document().toMatchImageSnapshot({ name: "Nelogat-mac13" });
    cy.scrollTo("top");
    cy.get(".Header_icon__1sL6t > img").should("be.visible");
    cy.get(".Header_header__1v0yI").should("be.visible");
    cy.get(".Header_logo__3T0lc > img").should("be.visible");
    cy.get("h1").should(
      "have.text",
      "Un loc al beneficiilor pentru cei care inspiră"
    );
    cy.get(".HomeNotLoggedScreen_header__2xfGY").should("be.visible");
    cy.get(".HomeNotLoggedScreen_discover__3LGO_").should("be.visible");
    cy.get(".HomeNotLoggedScreen_container__3tw7s").should("be.visible");
    cy.get(".HomeNotLoggedScreen_benefitsList__hnOqs").should("be.visible");

    cy.get(
      ".HomeNotLoggedScreen_header__2xfGY > a > .Button_button__BTO1A"
    ).should("be.visible");
    cy.contains("Descoperă IQOS Club").should("be.visible");
    cy.contains(
      "Devino membru al comunității de utilizatori IQOS și bucură-te de beneficii exclusive, nivel cu nivel."
    ).should("be.visible");
    cy.get(".HomeNotLoggedScreen_benefits__DyDpr").should("be.visible");
    cy.get(
      ".HomeNotLoggedScreen_discover__3LGO_ > a > .Button_button__BTO1A"
    ).should("be.visible");
    cy.contains("Cum funcționează").should("be.visible");
    cy.get('[src="./static/media/howToImage.d07a6d2b.jpg"]').should(
      "be.visible"
    );
    cy.get(
      ".HomeNotLoggedScreen_container__3tw7s > a > .Button_button__BTO1A"
    ).should("be.visible");

    cy.contains("Beneficiile tale la fiecare nivel").should("be.visible");
    cy.contains("Beneficiile IQOS Club").should("be.visible");
    cy.get(
      ".HomeNotLoggedScreen_benefitsList__hnOqs > a > .Button_button__BTO1A"
    ).should("be.visible");
    cy.get(".Footer_footer__7dIj9").should("be.visible");
    cy.scrollTo("bottom");
    cy.contains(
      "Acest produs nu este lipsit de riscuri. Eliberează nicotină, care provoacă dependență. IQOS este destinat adulților care altfel ar continua să fumeze sau să folosească produse cu nicotină."
    ).should("be.visible");
    // cy.get(".react-reveal > .Button_button__BTO1A")
    //   .click({ force: true })
    //   .url()
    //   .should("include", "/auth-loginform?loyalty=1");
    cy.get(
      ".HomeNotLoggedScreen_benefitsList__hnOqs > a > .Button_button__BTO1A"
    )
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1")
      .go("back");
    cy.get(".HomeNotLoggedScreen_container__3tw7s > a > .Button_button__BTO1A")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1")
      .go("back");
    cy.get(".HomeNotLoggedScreen_discover__3LGO_ > a > .Button_button__BTO1A")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1")
      .go("back");
    cy.get(".HomeNotLoggedScreen_header__2xfGY > a > .Button_button__BTO1A")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1")
      .go("back");
    cy.contains("Intră în cont")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1");
  });

  it("iPhone-8", () => {
    cy.viewport("iphone-8");
    cy.visit("/");
    cy.get("#agegate-yes").click();
    cy.contains("ACCEPT TOATE").click();
    cy.wait(1000);
    cy.document().toMatchImageSnapshot({ name: "Nelogat-iPhone8" });
    cy.scrollTo("top");
    cy.get(".Header_icon__1sL6t > img").should("be.visible");
    cy.get(".Header_header__1v0yI").should("be.visible");
    cy.get(".Header_logo__3T0lc > img").should("be.visible");
    cy.get("h1").should(
      "have.text",
      "Un loc al beneficiilor pentru cei care inspiră"
    );
    cy.get(".HomeNotLoggedScreen_header__2xfGY").should("be.visible");
    cy.get(".HomeNotLoggedScreen_discover__3LGO_").should("be.visible");
    cy.get(".HomeNotLoggedScreen_container__3tw7s").should("be.visible");
    cy.get(".HomeNotLoggedScreen_benefitsList__hnOqs").should("be.visible");
    cy.get(
      ".HomeNotLoggedScreen_header__2xfGY > a > .Button_button__BTO1A"
    ).should("be.visible");
    cy.contains("Descoperă IQOS Club").should("be.visible");
    cy.contains(
      "Devino membru al comunității de utilizatori IQOS și bucură-te de beneficii exclusive, nivel cu nivel."
    ).should("be.visible");
    cy.get(".HomeNotLoggedScreen_benefits__DyDpr").should("be.visible");
    cy.get(
      ".HomeNotLoggedScreen_discover__3LGO_ > a > .Button_button__BTO1A"
    ).should("be.visible");
    cy.contains("Cum funcționează").should("be.visible");
    cy.get('[src="./static/media/howToImage.d07a6d2b.jpg"]').should(
      "be.visible"
    );
    cy.get(
      ".HomeNotLoggedScreen_container__3tw7s > a > .Button_button__BTO1A"
    ).should("be.visible");

    cy.contains("Beneficiile tale la fiecare nivel").should("be.visible");
    cy.contains(
      "Avansează în nivel pentru a debloca mai multe beneficii"
    ).should("be.visible");

    cy.contains("Beneficiile nivelului Silver").click();
    cy.get(".ListBenefits_wrapper__3Cko9").toMatchImageSnapshot({
      name: "I-8 silver",
    });

    cy.contains("Beneficiile nivelului Gold").click();
    cy.get(".ListBenefits_wrapper__3Cko9").toMatchImageSnapshot({
      name: "I-8 gold",
    });

    cy.contains("Beneficiile nivelului Platinum").click();
    cy.get(".ListBenefits_wrapper__3Cko9").toMatchImageSnapshot({
      name: "I-8 platinum",
    });
    cy.contains(
      "Acest produs nu este lipsit de riscuri. Eliberează nicotină, care provoacă dependență. IQOS este destinat adulților care altfel ar continua să fumeze sau să folosească produse cu nicotină."
    ).should("be.visible");

    cy.get(".HomeNotLoggedScreen_header__2xfGY > a > .Button_button__BTO1A")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1")
      .go("back");

    cy.get(".HomeNotLoggedScreen_discover__3LGO_ > a > .Button_button__BTO1A")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1")
      .go("back");

    cy.get(".HomeNotLoggedScreen_container__3tw7s > a > .Button_button__BTO1A")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1")
      .go("back");

    cy.get(
      ":nth-child(1) > .HomeSlider_textContainer__2GRg8 > a > .Button_button__BTO1A"
    )
      .should("be.visible")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1");
  });

  it("iPhone-12Pro-max", () => {
    cy.viewport(428, 926);
    cy.visit("/");
    cy.get("#agegate-yes").click();
    cy.contains("ACCEPT TOATE").click();
    cy.wait(1000);
    cy.document().toMatchImageSnapshot({
      name: "Nelogat-iPhone12-pro-max",
    });
    cy.scrollTo("top");
    cy.get(".Header_icon__1sL6t > img").should("be.visible");
    cy.get(".Header_header__1v0yI").should("be.visible");
    cy.get(".Header_logo__3T0lc > img").should("be.visible");
    cy.get("h1").should(
      "have.text",
      "Un loc al beneficiilor pentru cei care inspiră"
    );
    cy.get(".HomeNotLoggedScreen_header__2xfGY").should("be.visible");
    cy.get(".HomeNotLoggedScreen_discover__3LGO_").should("be.visible");
    cy.get(".HomeNotLoggedScreen_container__3tw7s").should("be.visible");
    cy.get(".HomeNotLoggedScreen_benefitsList__hnOqs").should("be.visible");
    cy.get(
      ".HomeNotLoggedScreen_header__2xfGY > a > .Button_button__BTO1A"
    ).should("be.visible");
    cy.contains("Descoperă IQOS Club").should("be.visible");
    cy.contains(
      "Devino membru al comunității de utilizatori IQOS și bucură-te de beneficii exclusive, nivel cu nivel."
    ).should("be.visible");
    cy.get(".HomeNotLoggedScreen_benefits__DyDpr").should("be.visible");
    cy.get(
      ".HomeNotLoggedScreen_discover__3LGO_ > a > .Button_button__BTO1A"
    ).should("be.visible");
    cy.contains("Cum funcționează").should("be.visible");
    cy.get('[src="./static/media/howToImage.d07a6d2b.jpg"]').should(
      "be.visible"
    );
    cy.get(
      ".HomeNotLoggedScreen_container__3tw7s > a > .Button_button__BTO1A"
    ).should("be.visible");

    cy.contains("Beneficiile tale la fiecare nivel").should("be.visible");
    cy.contains(
      "Avansează în nivel pentru a debloca mai multe beneficii"
    ).should("be.visible");

    cy.contains("Beneficiile nivelului Silver").click();
    cy.get(".ListBenefits_wrapper__3Cko9").toMatchImageSnapshot({
      name: "I-12 silver",
    });

    cy.contains("Beneficiile nivelului Gold").click();
    cy.get(".ListBenefits_wrapper__3Cko9").toMatchImageSnapshot({
      name: "I-12 gold",
    });

    cy.contains("Beneficiile nivelului Platinum").click();
    cy.get(".ListBenefits_wrapper__3Cko9").toMatchImageSnapshot({
      name: "I-12 platinum",
    });
    cy.contains(
      "Acest produs nu este lipsit de riscuri. Eliberează nicotină, care provoacă dependență. IQOS este destinat adulților care altfel ar continua să fumeze sau să folosească produse cu nicotină."
    ).should("be.visible");

    cy.get(".HomeNotLoggedScreen_header__2xfGY > a > .Button_button__BTO1A")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1")
      .go("back");

    cy.get(".HomeNotLoggedScreen_discover__3LGO_ > a > .Button_button__BTO1A")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1")
      .go("back");

    cy.get(".HomeNotLoggedScreen_container__3tw7s > a > .Button_button__BTO1A")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1")
      .go("back");

    cy.get(
      ":nth-child(1) > .HomeSlider_textContainer__2GRg8 > a > .Button_button__BTO1A"
    )
      .should("be.visible")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1");
  });

  it("iPad-11", () => {
    cy.viewport(834, 1194);
    cy.visit("/");
    cy.get("#agegate-yes").click();
    cy.contains("ACCEPT TOATE").click();
    cy.wait(1000);
    cy.document().toMatchImageSnapshot({ name: "Nelogat-iPad-11" });
    cy.scrollTo("top");
    cy.get(".Header_icon__1sL6t > img").should("be.visible");
    cy.get(".Header_header__1v0yI").should("be.visible");
    cy.get(".Header_logo__3T0lc > img").should("be.visible");
    cy.get("h1").should(
      "have.text",
      "Un loc al beneficiilor pentru cei care inspiră"
    );
    cy.get(".HomeNotLoggedScreen_header__2xfGY").should("be.visible");
    cy.get(".HomeNotLoggedScreen_discover__3LGO_").should("be.visible");
    cy.get(".HomeNotLoggedScreen_container__3tw7s").should("be.visible");
    cy.get(".HomeNotLoggedScreen_benefitsList__hnOqs").should("be.visible");
    cy.get(
      ".HomeNotLoggedScreen_header__2xfGY > a > .Button_button__BTO1A"
    ).should("be.visible");
    cy.contains("Descoperă IQOS Club").should("be.visible");
    cy.contains(
      "Devino membru al comunității de utilizatori IQOS și bucură-te de beneficii exclusive, nivel cu nivel."
    ).should("be.visible");
    cy.get(".HomeNotLoggedScreen_benefits__DyDpr").should("be.visible");
    cy.get(
      ".HomeNotLoggedScreen_discover__3LGO_ > a > .Button_button__BTO1A"
    ).should("be.visible");
    cy.contains("Cum funcționează").should("be.visible");
    cy.get('[src="./static/media/howToImage.d07a6d2b.jpg"]').should(
      "be.visible"
    );
    cy.get(
      ".HomeNotLoggedScreen_container__3tw7s > a > .Button_button__BTO1A"
    ).should("be.visible");

    cy.contains("Beneficiile tale la fiecare nivel").should("be.visible");
    cy.contains(
      "Avansează în nivel pentru a debloca mai multe beneficii"
    ).should("be.visible");

    cy.contains(
      "Acest produs nu este lipsit de riscuri. Eliberează nicotină, care provoacă dependență. IQOS este destinat adulților care altfel ar continua să fumeze sau să folosească produse cu nicotină."
    ).should("be.visible");

    cy.get(".HomeNotLoggedScreen_header__2xfGY > a > .Button_button__BTO1A")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1")
      .go("back");

    cy.get(".HomeNotLoggedScreen_discover__3LGO_ > a > .Button_button__BTO1A")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1")
      .go("back");

    cy.get(".HomeNotLoggedScreen_container__3tw7s > a > .Button_button__BTO1A")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1")
      .go("back");

    cy.get(
      ":nth-child(1) > .HomeSlider_textContainer__2GRg8 > a > .Button_button__BTO1A"
    )
      .should("be.visible")
      .click()
      .url()
      .should("include", "/auth-loginform?loyalty=1");
  });
});
