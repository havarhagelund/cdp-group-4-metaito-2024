// Purpose: Test if other splats show up
describe("Open Helse og Omsorg splat", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("localhost:3000/splat/24");
  });

  it("displays navbar", () => {
    cy.get("nav").should("be.visible");
  });

  it("displays titles", () => {
    cy.contains("p", "Helse og omsorg Dashboard").should("be.visible");
    cy.contains("p", "Prosjektplan").should("be.visible");
  });

  it("displays buttons", () => {
    cy.get("button").should("be.visible");
  });

  it("Update Add oppstartsplan placeholder", () => {
    cy.contains("Add Oppstartsplan").click();

    cy.intercept(
      "PATCH",
      "https://gfwqjqgmuzlsrtfieiof.supabase.co/rest/v1/splat?id=eq.24",
      {
        statusCode: 200,
        body: { message: "Update intercepted" }, // Mock response body
      },
    ).as("updateRequest");

    cy.contains("Add Text Droplet").should("be.visible");

    cy.get("input").first().type("Oppstartsplan");
    cy.get('[id=":r1s:-form-item"]').type("Oppstartsplan");

    cy.contains("Edit Widget").click();
    cy.wait("@updateRequest").its("response.statusCode").should("eq", 200);

    cy.contains("Oppstartsplan").should("be.visible");
  });
});
