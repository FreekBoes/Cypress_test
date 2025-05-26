describe("Shopify Store", () => {

  // Functie om wachtwoord automatisch in te voeren
  function login() {
    cy.get("input[type='password']").type("stutta{enter}");  // Vul het wachtwoord in en druk op Enter
  }

  // Functie om de privacy pop-up te accepteren (wordt niet meer gebruikt in deze test)
  // function acceptPrivacyPopup() {
  //   cy.get('button#shopify-pc__banner__btn-accept').should('be.visible').click({ force: true });
  // }

  // Login op de wachtwoordpagina en wacht op redirect
  it("logs in with the correct password and redirects to the homepage", () => {
    cy.visit("https://r0984517-realbeans.myshopify.com");

    // Controleer of we op de wachtwoordpagina zijn, als dat zo is, vul het wachtwoord in
    cy.url().should('include', 'password');  // Wachtwoordpagina controleren
    login();  // Wachtwoord invoeren

    // Wacht op de pop-up en accepteer deze
    cy.wait(2000);  // Wacht even om ervoor te zorgen dat de pop-up verschijnt
    // acceptPrivacyPopup();  // De privacy pop-up wordt hier niet meer geaccepteerd

    // Wacht op de omleiding naar de winkelpagina
    cy.location('pathname').should('eq', '/');  // Controleer of we omgeleid zijn naar de winkelpagina
  });

  // Controleer of de homepage de juiste tekst en producten toont
  it("checks the homepage for correct text and products", () => {
    cy.visit("https://r0984517-realbeans.myshopify.com");

    // Controleer of we op de wachtwoordpagina zijn, als dat zo is, vul het wachtwoord in
    cy.url().should('include', 'password');  // Wachtwoordpagina controleren
    login();  // Wachtwoord invoeren

    // Wacht op de pop-up en accepteer deze
    cy.wait(2000);  // Voeg een korte vertraging toe om ervoor te zorgen dat de pop-up verschijnt
    // acceptPrivacyPopup();  // De privacy pop-up wordt hier niet meer geaccepteerd

    // Wacht even zodat de pagina volledig geladen is
    cy.wait(3000);  // Wacht iets langer voor de pagina-inhoud om volledig te laden

    // Scroll naar beneden naar de sectie met de producten
    cy.scrollTo('bottom', { ensureScrollable: false });  // Scroll naar beneden om de producten te laden

    // Wacht totdat de producten zichtbaar zijn op de pagina (met een langere timeout)
    cy.get('li.grid__item', { timeout: 10000 }).should('be.visible').and('have.length.greaterThan', 0);

    // Controleer of de tekst aanwezig is op de homepage
    cy.contains("Since 1801, RealBeans has roasted premium coffee in Antwerp for Europe’s finest cafes. Ethically sourced beans, crafted with care.")
      .should('be.visible'); // Zoek naar de tekst en controleer of het zichtbaar is

    // Controleer of de producten "Blended coffee 5kg" en "Roasted coffee beans 5kg" aanwezig zijn op de homepage
    cy.get('li.grid__item').contains('Blended coffee 5kg');
    cy.get('li.grid__item').contains('Roasted coffee beans 5kg');
  });

  // Controleer de "About Us" pagina op de juiste tekst
  it("checks the About Us page for correct text", () => {
    cy.visit("https://r0984517-realbeans.myshopify.com");

    // Controleer of we op de wachtwoordpagina zijn, als dat zo is, vul het wachtwoord in
    cy.url().should('include', 'password');  // Wachtwoordpagina controleren
    login();  // Wachtwoord invoeren

    // Wacht even zodat de pagina volledig geladen is
    cy.wait(3000);  // Wacht iets langer voor de pagina-inhoud om volledig te laden

    // Klik op de "About Us" link om naar de About Us pagina te gaan
    cy.get('#HeaderMenu-about-us').click();  // Klik op de "About Us" link in de navigatie

    // Controleer of we op de juiste pagina zijn
    cy.url().should('eq', 'https://r0984517-realbeans.myshopify.com/pages/contact');  // Controleer of we op de juiste pagina zijn

    // Wacht even zodat de pagina volledig geladen is
    cy.wait(3000);  // Wacht iets langer voor de pagina-inhoud om volledig te laden

    // Zoek de tekst op de About Us pagina
    cy.contains("From a small Antwerp grocery to a European coffee staple, RealBeans honors tradition while innovating for the future. Our beans are roasted in-house, shipped from Antwerp or Stockholm, and loved across the continent.")
      .should('be.visible');  // Controleer of de tekst zichtbaar is op de About Us pagina
  });

  // Controleer of de producten op de "All Products" pagina hetzelfde zijn als op de homepage
  it("checks if the same products are on the 'All Products' page", () => {
    // Controleer de producten op de homepage
    const products = ['Blended coffee 5kg', 'Roasted coffee beans 5kg'];

    // Ga naar de 'All Products' pagina
    cy.visit("https://r0984517-realbeans.myshopify.com/collections/all");

    // Controleer of we op de wachtwoordpagina zijn, als dat zo is, vul het wachtwoord in
    cy.url().should('include', 'password');  // Wachtwoordpagina controleren
    login();  // Wachtwoord invoeren

    // Wacht op de pop-up en accepteer deze
    cy.wait(2000);  // Voeg een korte vertraging toe om ervoor te zorgen dat de pop-up verschijnt
    // acceptPrivacyPopup();  // De privacy pop-up wordt hier niet meer geaccepteerd

    // Scroll naar beneden naar de sectie met de producten
    cy.scrollTo('bottom', { ensureScrollable: false });  // Scroll naar beneden om de producten te laden

    // Wacht totdat de producten zichtbaar zijn op de "All Products" pagina
    cy.get('li.grid__item', { timeout: 10000 }).should('be.visible').and('have.length.greaterThan', 0);

    // Controleer of de producten aanwezig zijn op de "All Products" pagina
    products.forEach(product => {
      cy.get('li.grid__item').contains(product);
    });
  });

});
