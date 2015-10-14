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

  # This scenario will run as part of the Meteor dev cycle because it has the @dev tag
  @focus
  Scenario: This scenario will run on both dev and CI
    When I navigate to "/"
    Then I should see the title "intentional failure"

  # This scenario will not run as part of the Meteor dev cycle because it does not have the @focus
  # tag, but it will run on CI if you use `meteor --test` for instance
  Scenario: This scenario will not run on dev but does run on CI
    When I navigate to "/"
    Then I should see the title "another intentional failure"

  # The @ignore tag is a convenience tag included by meteor-cucumber. See the docs for more on tags
  @ignore
  Scenario: This scenario will not run anywhere
    When I navigate to "/"
    Then I should see the title "it really doesn't matter"
