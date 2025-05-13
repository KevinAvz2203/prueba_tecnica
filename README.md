# Next.js Interactive Dashboard

This is an interactive dashboard project built with [Next.js](https://nextjs.org), designed to showcase key statistics, notifications, and reports using mock data. The project demonstrates the use of modern web development tools and libraries.

## Features

- **Dashboard**: Displays key metrics such as total categories, total products, the cheapest and most expensive products, and a chart showing product creation over time.
- **Notifications**: Lists recent updates related to products.
- **Shopping Cart**: Displays a list of products in the cart with prices and checkout options.
- **Reports**: Provides additional statistics, such as products by category, with charts and tables.

## Technologies Used

- [Next.js](https://nextjs.org) for server-side rendering and routing.
- [React ApexCharts](https://apexcharts.com/react-chart-demos/) for interactive charts.
- [Day.js](https://day.js.org/) for date manipulation.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- Mock API for data simulation.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KevinAvz2203/prueba_tecnica.git
   cd prueba_tecnica
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

Then, start the production server:

```bash
npm start
```

### Environment Variables

This project uses environment variables to configure the mock API. Create a `.env` file in the root of the project and add the following:

```env
NEXT_PUBLIC_DUMMY_JSON_URL=https://dummyjson.com
```

Replace `https://dummyjson.com` with the actual URL of your mock API.

## Learn More

To learn more about Next.js and the tools used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial.
- [React ApexCharts Documentation](https://apexcharts.com/react-chart-demos/) - Learn how to create charts with React ApexCharts.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn how to style your application with Tailwind CSS.

## Deploying the Application

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), which is built by the creators of Next.js.

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Feedback and Contributions

Feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/KevinAvz2203/prueba_tecnica). Your feedback and contributions are welcome!
