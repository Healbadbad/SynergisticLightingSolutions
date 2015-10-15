Feature: A user can create an account

  As a new user
  I want to create an account
  So that so that I can use the product

  The story above is to set context for the reader. It doesn't actually have any impact on the test
  itself. The phrases inside the scenarios are ties to test code using regex, which you can see in
  /tests/features/step_definitions/landing-page/create-account-steps.js

  In this textual part of the file, you can include context about this feature, you can add links to
  external documents and whatever is needed to create the full specification.

  # The background will be run for every scenario
  Background:
    Given I am a new user

  @focus
  Scenario: I should be able to see the modal to create an account
    When I navigate to "/"
    And click on "#signUpModalButton"
    Then I should see the selector "#newUsername"
    And I should see the selector "#newPassword"
    And I should see the selector "#rePassword"
    And I should see the selector ".logInCancel button.cancel"
    And I should see the selector "#registerButton"

  @focus
  Scenario: I should be able to create a valid account
    When I navigate to "/?
    And click on "#signUpModalButton"
    And fill out
      | "#newUsername" | "testUser"    |
      | "newPassword"  | "testPass123" |
      | "newPassword"  | "testPass123" |
    And click on "#registerButton"
    Then a new user is created with the attributes
      | username | testUser    |
      | password | testPass123 |
