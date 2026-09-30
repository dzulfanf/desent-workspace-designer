# Desent Workspace Designer

A responsive workspace rental configurator built with React, TypeScript, Next.js, and Tailwind CSS.

The application allows users to configure a workspace by selecting:

- Desk
- Desk variant / finish
- Chair
- Chair variant
- Accessories
- Workspace location
- Rental date
- Currency

The selected configuration is reflected in a visual workspace preview and a review setup summary.

## Features

### Workspace Configuration

Users can configure a workspace through a guided selection flow:

- Select a workspace location
- Select a rental date
- Select a currency
- Select a desk
- Select a desk variant / finish
- Select a chair
- Select a chair variant
- Add or remove accessories
- Configure available workspace extensions

### Product Availability

Products can have availability states based on the selected workspace configuration.

Unavailable products are visually disabled and cannot be selected.

The availability model is currently represented as local application data rather than a backend inventory system.

### Product Variant Preview

Products can define multiple variants such as different desk or chair finishes.

Variant images can be previewed directly from the product card without selecting the product first.

This creates a distinction between:

1. **Previewing a variant**
2. **Selecting a product**

For example, a user can click a desk finish and immediately see the corresponding image without changing the currently selected desk.

### Workspace Preview

The selected workspace is reflected in a lightweight visual preview.

The preview can represent:

- Desk
- Chair
- Monitor
- Monitor arm
- Desk lamp
- Speakers
- Indoor plant
- Other selected accessories

Selected product variants are also passed into the workspace preview so the preview can reflect the selected configuration.

### Review Setup

The review setup provides a summary of the current workspace configuration, including:

- Selected desk
- Selected desk variant
- Selected chair
- Selected chair variant
- Selected accessories
- Rental information
- Pricing information

The review action is kept separate from the product browsing experience so users can continue configuring the workspace without leaving the main flow.

### Responsive Interface

The interface adapts to different viewport sizes.

The product selection experience is optimized for:

- Mobile
- Tablet
- Desktop

Product grids, spacing, typography, header controls, workspace preview, and review actions adapt based on the available viewport.

## Tech Stack

- **Next.js** — React framework
- **React** — UI development
- **TypeScript** — Type-safe application development
- **Tailwind CSS** — Utility-first styling and responsive design
- **pnpm** — Package management
- **Vercel** — Deployment

## Design Approach

The UI follows a **minimal, product-focused workspace configurator** approach.

The main design goals are:

- Keep the interface visually clean and low-noise.
- Make product selection the primary interaction.
- Provide immediate visual feedback when selecting products and variants.
- Keep the workspace preview visible while configuring the workspace.
- Use compact product cards to support browsing multiple products.
- Keep the review setup accessible without interrupting the configuration flow.
- Make the experience responsive across mobile, tablet, and desktop.

### Responsive Design

The interface uses a mobile-first approach.

On smaller screens:

- Product grids use two columns where appropriate.
- Product cards use more compact spacing and typography.
- Header controls are rearranged to preserve horizontal space.
- Location and rental date controls can be moved into the workspace shell.
- The review setup action becomes a full-width action at the bottom of the summary.
- Workspace preview and configuration sections adapt to the available viewport.

On larger screens:

- Product grids expand to multiple columns.
- Workspace configuration and preview can be displayed side-by-side.
- Header controls use the available horizontal space more efficiently.
- The workspace preview provides a larger visual representation of the selected configuration.

## Workspace Preview

The workspace preview is intentionally implemented as a lightweight visual representation rather than a full 3D renderer.

Selected products are represented using simple UI shapes:

- Desk
- Chair
- Monitor
- Monitor arm
- Desk lamp
- Speakers
- Indoor plant

The preview also reacts to selected product variants.

For example, selecting a desk finish can change the product image shown in the product card and the corresponding selected variant passed to the workspace preview.

This approach keeps the implementation lightweight while still providing immediate visual feedback.

## Product Variants

Products can define variants such as:

- Desk finishes
- Chair finishes

Variants can provide their own image.

The product card displays the variant image when the user previews a variant, even before the product itself is selected.

This separates:

1. **Previewing a variant**
2. **Selecting a product**

so users can explore available finishes without changing the current workspace configuration.

## Component Structure

The UI is separated into focused components.

Examples include:

- `Header`
- `DeskGrid`
- `DeskCard`
- `ChairGrid`
- `ChairCard`
- `AccessoryGrid`
- `AccessoryCard`
- `ExtensionGrid`
- `ExtensionCard`
- `WorkspacePreview`
- `ReviewSetupBar`
- `ReviewSummaryItem`

The grids are responsible for collection-level behavior, while cards focus on presenting and interacting with individual products.

This keeps component APIs explicit and makes the UI easier to evolve.

## Data Model

The current implementation uses static workspace data.

Products contain information such as:

- ID
- Name
- Type
- Description
- Dimensions
- Price
- Image
- Variants
- Availability

Availability is currently represented as local application data and is evaluated against the selected workspace location and rental date.

## Scope

This implementation focuses primarily on the **frontend experience and interaction model** of a workspace configurator.

It demonstrates:

- Responsive UI
- Product selection
- Variant selection and preview
- Availability states
- Workspace preview
- Extension selection
- Currency formatting
- Rental date selection
- Location selection
- Review summary
- Component composition
- Type-safe React props
- Responsive product grids
- Interactive product cards

## Current Limitations

This project is intentionally scoped as a frontend implementation and does not represent a production-ready rental platform.

### No Database Connection

There is currently no database integration.

Workspace products, variants, availability, and extension data are stored as static application data.

A production implementation would likely move these resources to an API backed by a database.

### No Backend / API

There is currently no backend service responsible for:

- Product management
- Inventory
- Availability
- Rental reservations
- Orders
- Payments
- User accounts

The current application therefore does not persist workspace configurations to a server.

### No Unit Tests

Unit tests are not included in the current implementation.

Business rules such as availability calculation, variant selection, and price calculation would be candidates for unit tests in a production implementation.

### No E2E Tests

End-to-end testing is also not included.

A production implementation should cover important user journeys such as:

1. Selecting a location
2. Selecting a rental date
3. Selecting a desk
4. Previewing a desk variant
5. Selecting a chair
6. Adding accessories
7. Reviewing the configuration
8. Handling unavailable products

### Product Variants Have the Same Price

Different product variants currently share the same product price.

For example, changing a desk finish changes the visual representation but does not change the weekly rental price.

A future pricing model could allow:

```text
Product
 ├── Variant A → $14/week
 ├── Variant B → $16/week
 └── Variant C → $18/week