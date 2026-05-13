# CURA Healthcare Login Test Plan

## Application Overview

The CURA Healthcare Service application is a demo medical appointment booking system. This test plan focuses on the login functionality which is a critical gateway for users to access appointment booking features. The login page is accessible from the home page by clicking "Make Appointment" or navigating to the login link in the navigation menu.

## Test Scenarios

### 1. Login Functionality

**Seed:** `tests/functional/login.spec.ts`

#### 1.1. Positive: Successful login with valid credentials

**File:** `tests/functional/login.positive.spec.ts`

**Steps:**
  1. Navigate to the CURA Healthcare Service home page at https://katalon-demo-cura.herokuapp.com/
    - expect: Page title displays 'CURA Healthcare Service'
    - expect: Main heading 'CURA Healthcare Service' is visible
    - expect: Tagline 'We Care About Your Health' is displayed
  2. Click on the 'Make Appointment' button in the banner
    - expect: Page navigates to the login page (URL contains #login)
    - expect: Login heading is displayed
    - expect: Text 'Please login to make appointment.' is visible
  3. Enter valid username 'John Doe' in the Username field
    - expect: Username field accepts the input
    - expect: Text 'John Doe' appears in the username field
  4. Enter valid password 'ThisIsNotAPassword' in the Password field
    - expect: Password field accepts the input (text masked with asterisks)
    - expect: Password is entered without displaying the actual characters
  5. Click the 'Login' button
    - expect: Page navigates to the appointment page (URL contains #appointment)
    - expect: Appointment heading 'Make Appointment' is displayed
    - expect: User is successfully authenticated and logged in

#### 1.2. Negative: Login fails with invalid username and password

**File:** `tests/functional/login.negative.spec.ts`

**Steps:**
  1. Navigate to the CURA Healthcare Service home page at https://katalon-demo-cura.herokuapp.com/
    - expect: Page title displays 'CURA Healthcare Service'
    - expect: Main heading 'CURA Healthcare Service' is visible
  2. Click on the 'Make Appointment' button
    - expect: Page navigates to the login page
    - expect: Login form is displayed with username and password fields
  3. Enter invalid username 'InvalidUser' in the Username field
    - expect: Username field accepts the input
    - expect: Text 'InvalidUser' appears in the username field
  4. Enter invalid password 'WrongPassword' in the Password field
    - expect: Password field accepts the input
    - expect: Password field shows masked characters
  5. Click the 'Login' button
    - expect: Page remains on the login page (no navigation)
    - expect: Error message 'Login failed! Please ensure the username and password are valid.' is displayed
    - expect: Login form is still accessible for retry
