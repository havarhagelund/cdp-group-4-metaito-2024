// Purpose: Test the user flow of the application.
describe("Landing page", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("localhost:3000");
  });

  it("displays navbar", () => {
    cy.get("nav").should("be.visible");
  });

  it("displays buttons", () => {
    cy.get("button").should("be.visible");
  });

  it("displays image", () => {
    cy.get("img").should("be.visible");
  });

  it("clicks on 'Get Started' button", () => {
    cy.contains("button", "Get Started").click();
    cy.url().should("include", "/form");
  });
});

describe("Form page to Splat", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("localhost:3000/form");
  });

  it("go through questions", () => {
    // Page 1
    cy.get("h1")
      .contains("Hvilken bransje tilhører organisasjonen?")
      .should("be.visible");
    cy.get("h2").contains("Du kan velge").should("be.visible");
    cy.contains("Neste").should("be.disabled");
    cy.contains("Helse og omsorg").should("be.visible");
    cy.contains("Helse og omsorg").click();
    cy.contains("Neste").should("not.be.disabled");
    cy.contains("Neste").click();
    cy.url().should("include", "/form");

    // Page 2
    cy.contains("Neste").should("be.disabled");
    cy.get("h1").contains("Hvor stort er teamet?").should("be.visible");
    cy.get("h2").contains("Velg antall personer").should("be.visible");
    cy.contains("11-30").click();
    cy.contains("Neste").should("not.be.disabled");
    cy.contains("Neste").click();
    cy.url().should("include", "/form");

    // Page 3
    cy.contains("Neste").should("be.disabled");
    cy.get("h1")
      .contains("Hvilken av følgende beskriver best din rolle?")
      .should("be.visible");
    cy.get("h2").contains("Du kan velge flere som passer").should("be.visible");
    cy.contains("Prosjektleder").click();
    cy.contains("Neste").should("not.be.disabled");
    cy.contains("Neste").click();
    cy.url().should("include", "/form");

    // Page 4
    cy.wait(1000);
    cy.contains("Neste").should("be.disabled");
    cy.get("h1").contains("Hva blir du målt på?").should("be.visible");
    cy.get('[id="Hva blir du målt på?"]').type(
      "Hvor raskt jeg gjør arbeidsoppgavene mine",
    );
    cy.get("h1").contains("Hva er dine mål?").should("be.visible");
    cy.get('[id="Hva er dine mål?"]').type(
      "Hvor raskt jeg gjør arbeidsoppgavene mine",
    );
    cy.get("h1")
      .contains("Hva kreves for at du gjør en god jobb?")
      .should("be.visible");
    cy.get('[id="Hva kreves for at du gjør en god jobb?"]').type(
      "Hvor raskt jeg gjør arbeidsoppgavene mine",
    );
    cy.contains("Neste").should("not.be.disabled");
    cy.contains("Neste").click();
    cy.url().should("include", "/form");

    // Page 5
    cy.wait(1000);
    cy.contains("Neste").should("be.disabled");
    cy.get("h1")
      .contains("Hvor komfortabel er du med digitale verktøy?")
      .should("be.visible");
    cy.get("textarea").type("Jeg er veldig komfortabel med digitale verktøy");
    cy.contains("Neste").should("not.be.disabled");
    cy.contains("Neste").click();

    // Page 6
    cy.wait(1000);
    cy.contains("Neste").should("be.disabled");
    cy.get("textarea").type("... jeg vet ikke");
    cy.contains("Neste").should("not.be.disabled");
    cy.contains("Neste").click();

    // Page 6
    cy.wait(1000);
    cy.contains("Neste").should("be.disabled");
    cy.contains("Slack").click();
    cy.contains("Neste").should("not.be.disabled");
    cy.contains("Neste").click();

    // Splat page
    cy.wait(2000);
    cy.url().should("include", "/splat");
  });
});
