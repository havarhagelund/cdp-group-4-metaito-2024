// Purpose: Test if other splats show up
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

  it("clicks on 'Look at other splats' button", () => {
    cy.contains("button", "Look").click();
    cy.url().should("include", "/splats");
  });
});

describe("Splat pags", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("localhost:3000/splats");
  });

  it("displays navbar", () => {
    cy.get("nav").should("be.visible");
  });

  it("displays splat list", () => {
    cy.get("a").should("be.visible");
  });

  it("clicks on a splat", () => {
    cy.contains("Helse og omsorg").first().click();
    cy.url().should("include", "/splat/");
  });
});
