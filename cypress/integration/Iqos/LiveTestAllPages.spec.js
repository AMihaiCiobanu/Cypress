/// <reference types="cypress" />

const clear = Cypress.LocalStorage.clear;
const emailS = Cypress.env("emailS");
const passwordS = Cypress.env("passwordS");
const emailD = Cypress.env("emailD");
const passwordD = Cypress.env("passwordD");
const InscrieCodCTA = ".none > .Activities_content__2rtWy > a";
beforeEach(() => {
  //cy.visit("/");
  Cypress.Cookies.preserveOnce("session_id", "remember_token");
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});

describe("Iqos All Pages", () => {
  it("Login IQOS.ro", () => {
    Cypress.LocalStorage.clear = function(keys, ls, rs) {
      if (keys && keys.length == 0) {
        keys = Object.keys(localStorage);
      }
      //   whitelistKeys = [];
      //   keys = keys.filter(function(i) {
      //     return whitelistKeys.indexOf(i) < 0;
      //   });
      //   return clear.apply(this, arguments);
    };
    cy.visit("/");
    cy.get("#agegate-yes").click();
    cy.contains("Intră în cont").click();
    cy.url().should("include", "/auth-loginform?loyalty=1");
    //cy.get("#onetrust-accept-btn-handler").click();
    cy.get("#login-email").type(emailS);
    cy.get("#login-form-password").type(passwordS);
    cy.get(".login-form-button").click();
  });

  it("Meniu", () => {
    //cy.contains("ACCEPT TOATE",{timeout:6000}).click(); //accept toate
    cy.contains("Acumulează", { timeout: 10000 })
      .should("have.css", "font-size", "14px")
      .and("have.css", "font-weight", "500")
      .and("have.css", "color", "rgb(52, 48, 61)")
      .click();
    cy.get(".fadeInDown")
      .wait(1500)
      .toMatchImageSnapshot({ name: "tabAcumuleaza" });

    cy.contains("Folosește")
      .should("have.css", "font-size", "14px")
      .and("have.css", "font-weight", "500")
      .and("have.css", "color", "rgb(52, 48, 61)")
      .click();
    cy.get(".fadeInDown")
      .wait(1500)
      .toMatchImageSnapshot({ name: "tabFolosește" });

    cy.contains("Beneficii")
      .should("have.css", "font-size", "14px")
      .and("have.css", "font-weight", "500")
      .and("have.css", "color", "rgb(52, 48, 61)")
      .click();
    cy.get(".fadeInDown")
      .wait(1500)
      .toMatchImageSnapshot({ name: "tabBeneficii" });

    cy.contains("Comunitate")
      .should("have.css", "font-size", "14px")
      .and("have.css", "font-weight", "500")
      .and("have.css", "color", "rgb(52, 48, 61)")
      .click();
    cy.get(".fadeInDown")
      .wait(1500)
      .toMatchImageSnapshot({ name: "tabComunitate" });

    cy.contains("IQOS.ro")
      .should("have.css", "font-size", "14px")
      .and("have.css", "font-weight", "500")
      .and("have.css", "color", "rgb(52, 48, 61)")
      .click()
      .url()
      .should("include", "iqos.ro")
      .go("back");

    cy.contains("Asistență")
      .should("have.css", "font-size", "14px")
      .and("have.css", "font-weight", "500")
      .and("have.css", "color", "rgb(52, 48, 61)")
      .click()
      .url()
      .should("include", "/asistenta")
      .go("back");

    cy.get(".Header_menuIcons__3gy5M > :nth-child(1) > img") //notificari
      .should("be.visible")
      .click()
      .url()
      .should("include", "/contul-meu/notificarile-mele")
      .go("back");

    cy.get(".Header_menuIcons__3gy5M > :nth-child(2) > img") //contul meu
      .should("be.visible")
      .click()
      .url()
      .should("include", "/contul-meu")
      .go("back");

    cy.get(".Header_menuIcons__3gy5M > :nth-child(3) > img") //cos
      .should("be.visible")
      .click()
      .url()
      .should("include", "/cos-de-cumparaturi");

    cy.get(".Header_logo__3T0lc > img").click();
    cy.contains("Bine ai revenit").should("be.visible");
  });

  it("Dashboard", () => {
    cy.scrollTo("top");
    cy.get(".Header_logo__3T0lc > img").click();
    cy.contains("Bine ai revenit").should("be.visible");
    cy.contains("Vezi beneficiile nivelului tău")
      .click()
      .url()
      .should("include", "/beneficii")
      .go(-1);

    cy.contains("Momentele tale")
      .click()
      .url()
      .should("include", "/momente")
      .go(-1);
  });

  it("Vezi toate activitatile", () => {
    cy.get(".Activities_wrapper__14Toa > a > .Button_button__BTO1A")
      .should("have.text", "Vezi toate activitățile")
      .and("have.css", "color", "rgb(52, 48, 61)")
      .and("have.css", "font-size", "16px")
      .and("have.css", "font-weight", "500")
      .and("have.css", "background-color", "rgba(0, 0, 0, 0)")
      .and("have.css", "text-align", "center")
      .click()
      .url()
      .should("include", "/activities");

    cy.contains("Noutăți în IQOS Club")
      .should("have.text", "Noutăți în IQOS Club")
      .and("have.css", "color", "rgb(52, 48, 61)")
      .and("have.css", "font-size", "64px")
      .and("have.css", "font-weight", "700")
      .and("have.css", "background-color", "rgba(0, 0, 0, 0)")
      .and("have.css", "text-align", "center");

    cy.get(InscrieCodCTA)
      .click()
      .url()
      .should("include", "/introdu-cod")
      .go(-1);

    cy.contains("Începe cumpărăturile")
      .click()
      .url()
      .should("include", "/comanda-online")
      .go(-1);

    cy.get(".ContactSection_contactSection__3q60I").should("be.visible");
    cy.get(".Footer_footer__7dIj9").should("be.visible");
    cy.get(".LegalDisclaimer_wrapper___i-pQ").should("be.visible");
    cy.get(".LegalDisclaimer_wrapper___i-pQ > p");
  });

  it("Inscrie cod", () => {
    cy.scrollTo("top");
    cy.contains("Acumulează", { timeout: 8000 }).click();
    cy.contains("Înscrie coduri HEETS").click();
    cy.contains("Introdu coduri HEETS").should("be.visible");
    cy.contains(
      "Obține puncte pentru codurile introduse din pachetele de HEETS participante."
    ).should("be.visible");
    cy.contains("De ce să înscrii coduri HEETS?").should("be.visible");
    cy.contains(
      "Câștigi puncte pe care le poți transforma în beneficii exclusive."
    ).should("be.visible");
    cy.contains(
      "Fiecare cod introdus valorează 1 punct în contul tău IQOS Club."
    ).should("be.visible");
    cy.contains("Situația codurilor introduse de tine");
    cy.contains("Astăzi ai introdus");
    cy.contains("Luna aceasta ai introdus");
    //cy.clearLocalStorage({ log: true });
    //cy.clearLocalStorage(/firstAccessDate/);
    // cy.window().then((window) => {
    //   window.localStorage.clear("firstAccessDate");
    // });
    cy.contains("Scanează codul")
      .should("be.visible")
      .and("have.css", "color", "rgb(52, 48, 61)")
      .and("have.css", "background-color", "rgba(0, 0, 0, 0)")
      .and("have.css", "font-size", "16px")
      .click();
    cy.get(".popup-content")
      .should("be.visible")
      .and("have.css", "background-color", "rgb(255, 255, 255)");
    cy.contains("Scanează și verifică").should("be.visible");
    cy.contains(
      "Asigură-te, după scanare, că datele au fost introduse corect."
    ).should("be.visible");
    cy.contains("Continuă")
      .should("be.visible")
      .and("have.css", "color", "rgb(52, 48, 61)")
      .and("have.css", "background-color", "rgba(0, 0, 0, 0)")
      .and("have.css", "font-size", "16px")
      .click();
    // cy.clearLocalStorage("firstAccessDate", { log: true });
    cy.contains("Adaugă încă un cod")
      .should("be.visible")
      .and("have.css", "color", "rgb(52, 48, 61)")
      .and("have.css", "background-color", "rgba(0, 0, 0, 0)")
      .and("have.css", "font-size", "16px");
    cy.get("#code-0").should("be.visible");
    cy.get("#code-1").should("not.exist");
    cy.contains("Adaugă încă un cod").click();
    cy.get("#code-1").should("be.visible");
    cy.contains("Adaugă încă un cod").click();
    cy.get("#code-2").should("be.visible");
    cy.contains("Adaugă încă un cod").click();
    cy.get("#code-3").should("be.visible");
    cy.get(":nth-child(1) > .Form_removeInput__2E-YK > img").click();
    cy.get("#code-3").should("not.exist");
    cy.contains("Cod HEETS")
      .click()
      .type("123123");
    cy.get("#showLoader").click();
    cy.contains("Cod greșit", { timeout: 4000 })
      .should("be.visible")
      .and("have.css", "color", "rgb(30, 30, 30)");
    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and(
        "have.text",
        "Întâmpini probleme?Dacă întâmpini dificultăți în introducerea codurilor rezervelor HEETS, păstrează codurile și ia legătura cuCentrul de Asistență Clienți."
      );
    cy.contains("Centrul de Asistență Clienți")
      .click()
      .url()
      .should("include", "/contact")
      .go("back");
    cy.contains("Unde găsesc codurile?").click();
    cy.get(".bootstrap-tooltip > .details")
      .should("be.visible")
      .and("have.text", "Codul se găsește în pachet");
    cy.get(".InsertCode_title__3_6RU")
      .should("be.visible")
      .and("have.text", "Folosește puncteleacumulate în cont.");
    cy.get(".InsertCode_detailsUgcSection__2_l9P > p")
      .should("be.visible")
      .and(
        "have.text",
        "Bucură-te de beneficiile IQOS Club cu punctele din contul tău."
      );
    cy.contains("Află mai multe")
      .should("be.visible")
      .and("have.css", "color", "rgb(255, 253, 251)")
      .and("have.css", "background-color", "rgba(0, 0, 0, 0)")
      .click()
      .url()
      .should("include", "/cum-folosesc-punctele");
  });

  it("MGM", () => {
    cy.scrollTo("top");
    cy.contains("Acumulează").click();
    cy.contains("Invită un prieten").click();
    cy.get(".textContainer").should("have.css", "color", "rgb(30, 30, 30)");
    cy.get(".textContainer").should(
      "contain.text",
      "Același ritual.Aceeași comunitate.Recomandă IQOS unui prieten adult fumător și bucurați-vă împreună de beneficii."
    );
    cy.contains("Același ritual.").should(
      "have.css",
      "color",
      "rgb(0, 209, 210)"
    );
    cy.contains("Aceeași comunitate.").should(
      "have.css",
      "color",
      "rgb(248, 248, 248)"
    );
    cy.contains(
      "Recomandă IQOS unui prieten adult fumător și bucurați-vă împreună de beneficii."
    ).should("have.css", "color", "rgb(248, 248, 248)");
    cy.contains("Prenume")
      .click()
      .clear()
      .type("Florin");
    cy.contains("Nume")
      .click()
      .clear()
      .type("Marcel");
    cy.contains("Număr de telefon")
      .click()
      .clear()
      .type("0749798510");
    cy.contains("Județ").click();
    cy.get(".Autocomplete_optionContainer__3HKn0 > :nth-child(2)").click();
    cy.contains("Oraș")
      .should("be.visible")
      .click();
    cy.get(".Autocomplete_optionContainer__3HKn0 > :nth-child(1)").click();
    cy.get(".control").should(
      "have.text",
      "Sunt fumător, am împlinit 18 ani, iar datele personale furnizate de mine în programul IQOS Club vor fi folosite pentru a putea fi contactat de un reprezentant de vânzări IQOS."
    );
    cy.get(".Form_termsConditions__3c9VM").should(
      "have.text",
      "Te rugăm să citești  aici condițiile în care punctele sunt acordate pentru recomandarile trimise și finalizate cu succes (achiziție)."
    );
    cy.get(".control__indicator")
      .should("not.be.checked")
      .click({ force: true });

    cy.get(".Form_disclaimer__3iFuW").should(
      "have.text",
      "Nu uita: persoana pe care o recomanzi trebuie să aștepte să fie contactată de către un reprezentant IQOS, pentru a achiziționa un dispozitiv. Dacă persoana pe care o recomanzi achiziționează pe cont propriu un dispozitiv IQOS din alt loc sau în alt mod, nu vei primi punctele pentru recomandarea făcută cu succes. Vezi regulamentul aici."
    );
    cy.get(":nth-child(6) > .Button_button__BTO1A")
      .should("have.text", "Trimite invitație")
      .and("be.visible")
      .and("have.css", "color", "rgb(255, 253, 251)")
      .and("have.css", "background-color", "rgb(52, 48, 61)")
      .and("have.css", "font-size", "16px");
    cy.contains("aici")
      .click()
      .url()
      .should("include", "/club/regulament")
      .go("back");
    cy.get(".Form_disclaimer__3iFuW > a")
      .click()
      .url()
      .should("include", "/club/regulament")
      .go("back");
    cy.get(".FormDetails_formDetails__2XbNQ > .react-reveal > h3").should(
      "have.text",
      "Împărtășește experiența IQOS și bucură-te de beneficii:"
    );
    cy.get(
      ".FormDetails_formDetails__2XbNQ > .react-reveal > :nth-child(2)"
    ).should(
      "have.text",
      "Invită-ți prietenii adulți fumători să treacă la IQOS și, dacă aceștia decid să achiziționeze kit-ul IQOS, te vei bucura de beneficii în IQOS Club:"
    );
  });

  it("Catalog", () => {
    //cy.visit("/");
    cy.scrollTo("top");
    cy.contains("Folosește").click();
    cy.contains("Catalog").click();
    //cy.contains("Qollection Summer Sales: Geantă Optimef").should("be.visible");
    cy.get(
      ":nth-child(1) > .catalog_details__3gK5D > .catalog_ctaButton__22tnd"
    ).click();

    cy.contains("Coșul tău a fost actualizat.", { timeout: 6000 }).should(
      "be.visible"
    );
    cy.get(
      ":nth-child(1) > div.catalog_thumb__GU4In > .catalog_productSlider__1cKTd > .catalog_thumb__GU4In"
    )
      .click()
      .url()
      .should("include", "/club/product/");
    cy.contains("Descriere produs:").should("be.visible");
    cy.contains("Adaugă în coș").should("be.visible");
    //cy.get(":nth-child(1) > .carousel-root > .carousel > .control-prev").should("not.be.visible"); //imagine sageata stanga
    //cy.get(":nth-child(1) > .carousel-root > .carousel > .control-next").click();
    //cy.get(":nth-child(1) > .carousel-root > .carousel > .control-prev").should( "be.visible");
    cy.contains("Adaugă în coș").click();
    cy.contains("Coșul tău a fost actualizat.").should("be.visible");
    cy.scrollTo("top");
    cy.get(".Header_menuIcons__3gy5M > :nth-child(3) > img").click({
      force: true,
    });
    cy.get('[data-label="Produs"]').should("be.visible");
    cy.get(".style_deleteProduct__2dMdV > .fa").click();
    cy.scrollTo("top");
    cy.contains("Momentan nu ai niciun produs în coș.").should("be.visible");
  });

  it("Foloseste Puncte", () => {
    //cy.visit("/");
    cy.scrollTo("top");
    cy.contains("Folosește").click();
    cy.contains("Cum folosesc punctele").click({ force: true });
    cy.get(".HowTo_detailsHeader__uiADZ").should(
      "have.text",
      "Cum folosesc puncteleAflă cum te poți bucura de beneficiile IQOS Club cu punctele din contul tău."
    );
    cy.get(".HowTo_imageHeader__29WCK").should("be.visible");
    //Plaseaza comenzi in IQOS.ro
    cy.contains("Plasează comenzi în IQOS.ro").should("be.visible");
    cy.contains(
      "Cu punctele acumulate poți achita parțial sau total contravaloarea produselor pe care ți le dorești din IQOS Shop-ul de pe IQOS.ro."
    ).should("be.visible");

    cy.get(
      '[style="background: rgb(219, 54, 36);"] > .HowTo_details__3jPSI > a > .Button_button__BTO1A'
    )
      .click()
      .url()
      .should("include", "/iqos3-duo")
      .go("back");

    ///Cumpara din insule
    cy.get(
      '[style="background: rgb(52, 48, 61);"] > .ImageSection_imageContainer__hxQoD > img'
    ).should("be.visible");
    cy.get(
      '[style="background: rgb(52, 48, 61);"] > .HowTo_details__3jPSI > h3'
    )
      .should("have.text", "Cumpără din insulele și magazinele IQOS")
      .and("have.css", "font-size", "64px")
      .and("have.css", "color", "rgb(255, 253, 251)");

    cy.contains("Află mai multe detalii")
      .should("have.text", "Află mai multe detalii")
      .and("have.css", "font-size", "16px")
      .and("have.css", "color", "rgb(255, 253, 251)")
      .and("have.css", "text-align", "center")
      .click()
      .url()
      .should(
        "include",
        "/descopera-iqos/un-nou-beneficiu-poti-acumula-si-folosi-puncte-in-insulele-si-magazinele-iqos"
      )
      .go("back");

    //HEETS delivery
    cy.contains("Comandă HEETS prin HEETS Delivery");
    cy.contains("Configurează abonamentul")
      .should("have.text", "Configurează abonamentul")
      .and("have.css", "font-size", "16px");

    ///Revendica Heets din mag
    cy.get(":nth-child(5) > .ImageSection_imageSection__mqjS6").should(
      "be.visible"
    );
    cy.get(
      ":nth-child(5) > .ImageSection_imageSection__mqjS6 > .ImageSection_imageContainer__hxQoD > img"
    ).should("be.visible");
    cy.contains("Generează cod Revendicare")
      .click()
      .url()
      .should("include", "/revendica-heets-offline");
    cy.scrollTo("top");
    cy.contains("Folosește").click();
    cy.contains("Cum folosesc punctele").click();
    ///Comanda din cat. IQOS Club
    cy.get(".HowTo_image__1xH9w > img").should("be.visible");
    cy.get(".HowTo_detailsCatalog__2FUUU").should("be.visible");
    cy.contains("Intră în catalog")
      .should("have.text", "Intră în catalog")
      .and("have.css", "color", "rgb(52, 48, 61)")
      .and("have.css", "text-align", "center")
      .and("have.css", "font-size", "16px")
      .click()
      .url()
      .should("include", "/catalog")
      .go("back");
  });

  it("Acumuleaza puncte", () => {
    cy.scrollTo("top");
    cy.contains("Acumulează").click();
    cy.contains("Cum acumulezi puncte")
      .click()
      .url()
      .should("include", "/club/acumuleaza-puncte");
    cy.get("#section-1 > .react-reveal > a > .Button_button__BTO1A")
      .should("have.css", "background-color", "rgba(0, 0, 0, 0)")
      .and("have.text", "Invită-ți prietenii")
      .and("have.css", "font-size", "16px");
    cy.get(".EarnPointsAuthenticatedReskin_detailsHeader__1jMDn").should(
      "include.text",
      "Adună puncteîn IQOS ClubAcumulează puncte în contul tău și folosește-le în universul IQOS."
    );
    cy.get(".EarnPointsAuthenticatedReskin_imageHeader__1nIH5").should(
      "be.visible"
    );
    cy.get(":nth-child(1) > div > .fa").click();
    cy.get(":nth-child(2) > div > .fa").click();
    cy.get(":nth-child(3) > div > .fa").click();
    cy.get(":nth-child(4) > div > .fa").click();
    cy.get(
      ".EarnPointsAuthenticatedReskin_sticky__2Gxab > ul > :nth-child(1)"
    ).click();
    cy.get(
      ".EarnPointsAuthenticatedReskin_sticky__2Gxab > ul > :nth-child(2)"
    ).click();
    cy.get(
      ".EarnPointsAuthenticatedReskin_sticky__2Gxab > ul > :nth-child(3)"
    ).click();
    cy.get(
      ".EarnPointsAuthenticatedReskin_sticky__2Gxab > ul > :nth-child(4)"
    ).click();
    cy.get("#section-1 > .react-reveal > a > .Button_button__BTO1A")
      .click()
      .url()
      .should("include", "/club/recomanda")
      .go("back");
    cy.get("#section-2 > .react-reveal > a > .Button_button__BTO1A")
      .click()
      .url()
      .should("include", "/iqos3-duo")
      .go("back");
    cy.get("#section-3 > .react-reveal > a > .Button_button__BTO1A")
      .click()
      .url()
      .should("include", "/introdu-cod")
      .go("back");
    cy.get("#section-4 > .react-reveal").should("be.visible");
    cy.get(".EarnPointsAuthenticatedReskin_extraPoints__3UcEf").should(
      "be.visible"
    );
  });

  it("Comanda Online", () => {
    cy.scrollTo("top");
    cy.contains("Acumulează").click();
    cy.contains("Comandă online").click();
    cy.get(".OrderOnline_detailsHeader__2UTq7 > :nth-child(1)").should(
      "include.text",
      "Comandă online"
    );
    cy.get(".OrderOnline_imageHeader__1kdn1").should("be.visible");

    //Cumpara din IQOS.ro
    cy.get('[style="background: rgb(0, 209, 210);"]').should("be.visible");
    cy.get(
      '[style="background: rgb(0, 209, 210);"] > .ImageSection_imageContainer__hxQoD > img'
    ).should("be.visible");
    cy.get(
      '[style="background: rgb(0, 209, 210);"] > .OrderOnline_details__2FhKa > a > .Button_button__BTO1A'
    )
      .click()
      .url()
      .should("include", "/iqos3-duo")
      .go("back");

    cy.get(".OrderOnline_imageDelivery__1QJX4").should("be.visible");
    cy.get(
      ".OrderOnline_imageDelivery__1QJX4 > .ImageSection_imageContainer__hxQoD > img"
    ).should("be.visible");
    cy.get(
      ".OrderOnline_imageDelivery__1QJX4 > .OrderOnline_details__2FhKa"
    ).should("be.visible");
    cy.contains("Configurează abonamentul")
      .should("be.visible")
      .click();
    cy.get(".ant-modal-body").should("be.visible");
    cy.contains("De ce să alegi HEETS Delivery?").should("be.visible");
    cy.contains("Activează").should("be.visible");
    cy.get(".anticon > svg").click();

    //Iqos Club
    cy.get(".ImageSection_isRight__1SG-9").should("be.visible");
    cy.get(
      ".ImageSection_isRight__1SG-9 > .ImageSection_imageContainer__hxQoD > img"
    ).should("be.visible");
    cy.contains("Intră în catalog")
      .click()
      .url()
      .should("include", "/catalog")
      .go("back");
  });

  it("IQOS World", () => {
    cy.visit("/");
    cy.scrollTo("top");
    cy.contains("Comunitate").click();
    cy.contains("IQOS World")
      .click()
      .url()
      .should("include", "/iqos-world");
    cy.contains("IQOS World").should("be.visible");
    cy.contains("O lume a experiențelor împreună").should("be.visible");
    cy.get(".IqosWorld_detailsHeading__g85RB > img").should("be.visible");

    //Diploma
    cy.get(".IqosWorld_diplomaWrapper__AiTEa").should("be.visible");
    cy.get(
      ".IqosWorld_diplomaWrapper__AiTEa > .IqosWorld_detailsImageSection__2E0Pr"
    );
    //Experiente multisenzationale
    cy.get(".IqosWorld_firstSection__3Al64").should("be.visible");
    cy.get(".IqosWorld_image__2Qrw1 > img").should("be.visible");
    cy.get(".IqosWorld_toolsImage__1xBcr").should("be.visible");
    cy.get(".IqosWorld_experiences__2y2i7").should("be.visible");

    ///Art for air
    cy.get(".content > :nth-child(5)").should("be.visible");
    cy.get(":nth-child(5) > .ImageSection_imageContainer__hxQoD > img").should(
      "be.visible"
    );
    cy.get(":nth-child(5) > .IqosWorld_detailsImageSection__2E0Pr").should(
      "be.visible"
    );
    cy.get(
      ":nth-child(5) > .IqosWorld_detailsImageSection__2E0Pr > a > .Button_button__BTO1A"
    ).should("be.visible");

    ///Network of Emotions
    cy.get(".ImageSection_isRight__1SG-9").should("be.visible");
    cy.get(
      ".ImageSection_isRight__1SG-9 > .ImageSection_imageContainer__hxQoD > img"
    ).should("be.visible");
    cy.get(
      ".ImageSection_isRight__1SG-9 > .IqosWorld_detailsImageSection__2E0Pr"
    ).should("be.visible");

    cy.get(".BottomSection_bottomSection__3LC5Q").should("be.visible");

    //PAG Dipploma
    cy.get(
      ".IqosWorld_diplomaWrapper__AiTEa > .IqosWorld_detailsImageSection__2E0Pr > a > .Button_button__BTO1A"
    )
      .should("have.text", "Află mai multe")
      .click()
      .url()
      .should("include", "/iqos-x-diploma-together-we-art");
    cy.contains("IQOS x Diploma:").should("be.visible");
    cy.contains("Together We Art").should("be.visible");
    cy.get(".DiplomaIQOS_detailsHeading__FlEQb > img").should("be.visible");
    cy.get(
      ".DiplomaIQOS_section1__3dXGp > .DiplomaIQOS_imageContainer__3vLpM > img"
    );
    cy.get(".DiplomaIQOS_section1__3dXGp > .DiplomaIQOS_textContainer__22Jgb");
    cy.get(".DiplomaIQOS_absoluteImage__2swnB");
    cy.get('[src="./static/media/img-03.54e7c0f5.jpg"]');
    cy.get(".DiplomaIQOS_section2__3nFjE > .DiplomaIQOS_textContainer__22Jgb");
    cy.get(".ImageSection_imageContainer__hxQoD > img");
    cy.get(".DiplomaIQOS_detailsImageSection__gPOc_");
    cy.get(".LegalDisclaimer_wrapper___i-pQ");
    cy.go("back");
    ///PAG 2 Art for air
    cy.get(
      ":nth-child(5) > .IqosWorld_detailsImageSection__2E0Pr > a > .Button_button__BTO1A"
    )
      .should("have.text", "Află mai multe")
      .click()
      .url()
      .should("include", "/art-for-air");
    cy.contains("Art for Air");
    cy.get(".LpArtForAir_detailsHeading__3eTTY > img");
    cy.get('[src="./static/media/art3.09d386fe.png"]');
    cy.get('[src="./static/media/art3.09d386fe.png"]');
    cy.get(".LpArtForAir_thumbVideo__34eX- > img").click();
    cy.get(".ant-modal-body > div > iframe");
    cy.get(".anticon > svg > path").click();
    cy.get(
      ".LpArtForAir_detailsImageSection__sWu_7 > a > .Button_button__BTO1A"
    ).click();
    cy.get(".anticon > svg > path").click();
    cy.get(".LpArtForAir_desktopArt__19bDa");
    cy.get(".LpArtForAir_isVideo__2U67J");
    // cy.get(".ant-modal-close-x").click({ multiple: true });
    cy.get("#scrollUp");
    cy.get(
      '[href="/iqos-world-network-of-emotions"] > .Button_button__BTO1A'
    ).click();

    ///PAG 3 Network of Emotions
  });

  it("Contactează-ne/Footer", () => {
    cy.scrollTo("bottom");
    cy.get("ul > :nth-child(1) > .nav-link")
      .click()
      .url()
      .should("include", "/club/contact");
    cy.get("h1").should("have.text", "Asistență");
    cy.get("ul > :nth-child(1) > .nav-link").should("be.visible");
    cy.contains("Cum folosesc punctele").should("be.visible");
    cy.contains("De unde revendici IQOS").should("be.visible");
    cy.get(":nth-child(1) > .style_centerAlign__1RZ40").contains("Tutoriale");
    cy.contains("Harta IQOS").should("be.visible");
    cy.contains("Întrebări frecvente").should("be.visible");
    cy.get(":nth-child(1) > .Button_primaryButton__3CeEz")
      .click()
      .url()
      .should("include", "/club/cum-folosesc-punctele")
      .go("back");
    cy.get(":nth-child(2) > .Button_primaryButton__3CeEz")
      .click()
      .url()
      .should("include", "/club/revendica-heets-offline")
      .go("back");
    cy.get("ul > :nth-child(1) > .nav-link")
      .click()
      .url()
      .should("include", "/club/contact");
    //cy.contains("formularul de contact.").click().url().should("include","/").go("back");
    cy.get(".style_messageUs__9HRyZ").contains("Message us");
    ///////contact form
    cy.get("#contact").should("be.visible");
    cy.get("form > button").click();
    cy.contains("Acest câmp este obligatoriu.").should("be.visible");
    cy.get(".style_group__3dajx > :nth-child(1) > input").type("Mihai");
    cy.get(".style_group__3dajx > :nth-child(2) > input").type("Mihai");
    cy.get(".style_group__3dajx > :nth-child(3) > input").type(
      "Test@gmail.com"
    );
    cy.get(":nth-child(4) > input").type("0");
    cy.get("form > :nth-child(2) > input").type("Test");
    cy.get(".textarea > textarea").type("Marcel");
    cy.get('[style="width: 304px; height: 78px;"] > div > iframe').click();
    cy.contains("Te rugăm să introduci minim 30 de caractere.").should(
      "be.visible"
    );
    cy.contains("Învață despre IQOS")
      .click()
      .url()
      .should("include", "/asistenta")
      .go("back");
    //cy.contains("Explorează").click().url().should("include","/club").go("back")
    cy.contains("Vezi răspunsurile")
      .click()
      .url()
      .should("include", "/club/intrebari-frecvente")
      .go("back");
  });

  it("Footer", () => {
    cy.scrollTo("bottom");
    cy.contains("Linkuri utile").should("be.visible");
    //cy.contains("ACCEPT TOATE").click();
    cy.wait(1500);
    cy.contains("Găsește IQOS")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/");
    cy.contains("Listă câștigători")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/lista-castigatori")
      .go("back");
    cy.contains("Noutăți")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/noutati")
      .go("back");
    cy.contains("Accesează PMI.COM")
      .should("be.visible")
      .click();
    cy.get(".popup-content").should("be.visible");
    cy.contains("Accesează link-ul")
      .should("be.visible")
      .click();
    cy.contains("Renunță")
      .should("be.visible")
      .click();

    cy.contains("Asistență clienți").should("be.visible");
    cy.get("ul > :nth-child(1) > .nav-link")
      .should("be.visible")
      .and("have.text", "Contactează-ne")
      .click()
      .url()
      .should("include", "/contact")
      .go("back");
    cy.contains("Regulament")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/regulament")
      .go("back");
    cy.contains("Tutoriale")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/myiqos/asistenta")
      .go("back");
    cy.contains("Înlocuire IQOS")
      .should("be.visible")
      .click()
      .url()
      .should(
        "include",
        "/garantie-iqos-si-metode-de-inlocuire-a-dispozitivului"
      )
      .go("back");
    cy.contains("Întrebări frecvente")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/intrebari-frecvente")
      .go("back");

    cy.contains("Legal").should("be.visible");
    cy.contains("ANPC")
      .should("be.visible")
      .click();
    cy.contains("Urmează să mergi pe un alt site").should("be.visible");
    cy.contains("Renunță")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/club");
    cy.contains("Termeni și condiții")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/conditii-de-utilizare")
      .go("back");
    cy.contains("Termeni și condiții - Trade-in")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/termeni-si-conditii-trade-in")
      .go("back");
    cy.contains("Notificare de protecție a datelor")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/privacy")
      .go("back");
    cy.contains("Politică de cookies")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/cookies")
      .go("back");
    //cy.contains("ACCEPT TOATE").click();
    cy.contains("Gestionează cookies").should("be.visible");
    //cy.contains("Ce cookie-uri utilizăm?", { timeout: 6000 })
    //cy.contains("Salvează setările").click();
    cy.contains("Conținut generat de utilizatori")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/continut-generat-de-utilizatori")
      .go("back");

    cy.contains("Urmărește-ne").should("be.visible");
    cy.get(".Footer_pullRight__3FvK5 > ul > :nth-child(1) > a")
      .should("be.visible")
      .click();
    cy.get(".WarningExternalLinkModal_externalRouteWarning__w4TO5").should(
      "be.visible"
    );
    cy.contains("Accesează link-ul").should("be.visible");
    cy.contains("Renunță")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/club");
    cy.contains("Twitter")
      .should("be.visible")
      .click();
    cy.get(".WarningExternalLinkModal_externalRouteWarning__w4TO5").should(
      "be.visible"
    );
    cy.contains("Accesează link-ul").should("be.visible");
    cy.contains("Renunță")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/club");
    cy.contains("Instagram")
      .should("be.visible")
      .click();
    cy.get(".WarningExternalLinkModal_externalRouteWarning__w4TO5").should(
      "be.visible"
    );
    cy.contains("Accesează link-ul").should("be.visible");
    cy.contains("Renunță")
      .should("be.visible")
      .click()
      .url()
      .should("include", "/club");
  });
});
