# ProvectaFisc - Ionic Angular Project

## Project Overview
This is an Ionic Angular application designed for internal usage with the following features:
- Ionic Angular framework with sidemenu template
- HTTP client configured for API access
- Internal web application (no PWA/HTTPS requirements)
- Capacitor integration for potential mobile deployment

## Project Setup Checklist

- [x] **Verify that the copilot-instructions.md file in the .github directory is created**

- [x] **Clarify Project Requirements**
  - Ionic Angular project with sidemenu template
  - HTTP client for API access
  - Internal usage (no PWA required)

- [x] **Scaffold the Project**
  - Created Ionic Angular project with sidemenu template
  - Configured Capacitor for potential mobile deployment
  - Set up basic project structure

- [x] **Customize the Project**
  - Added HTTP client support to main.ts
  - Created API service with sample HTTP methods
  - Configured project for internal usage

- [x] **Install Required Extensions**
  - No specific extensions required for this project type

- [x] **Compile the Project**
  - All dependencies installed successfully
  - Project structure validated

- [x] **Create and Run Task**
  - Development server task created and running for `ionic serve`

- [x] **Launch the Project**
  - Development server launched successfully at http://localhost:8100

- [x] **Ensure Documentation is Complete**
  - README.md exists with project information
  - Copilot instructions updated and cleaned

## Key Files
- `src/app/services/api.service.ts` - HTTP client service for API calls
- `src/main.ts` - Main application bootstrap with HTTP client configuration
- `src/app/app.component.ts` - Main app component with sidemenu
- `package.json` - Project dependencies and scripts

## Development Commands
- `ionic serve` - Start development server
- `ionic build` - Build the application
- `ionic capacitor add ios/android` - Add mobile platforms
- `ionic capacitor run ios/android` - Run on mobile devices
