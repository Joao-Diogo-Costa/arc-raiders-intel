# ARC Raiders Intel

ARC Raiders Intel is a web application dedicated to providing the latest news, patch notes, and intelligence for the game ARC Raiders. Stay up-to-date with the latest developments and gain a competitive edge with our comprehensive database of information.

## Features

- **Latest News:** Get the latest news and announcements about ARC Raiders.
- **Patch Notes:** Detailed information on every game update and patch.
- **Intel Database:** A comprehensive database of in-game intelligence, including weapons, enemies, and more.
- **Responsive Design:** A clean and modern user interface that works on all devices.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Joao-Diogo-Costa/arc-raiders-intel.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env.local` file in the root of the project and add the following environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- [Next.js](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Supabase](https://supabase.io/) - Backend-as-a-Service
- [Shadcn/ui](https://ui.shadcn.com/) - UI Components

## Project Structure

- `app/`: Contains the core application logic, including pages and layouts.
- `components/`: Contains reusable UI components.
- `lib/`: Contains utility functions and Supabase client configuration.
- `public/`: Contains static assets like images and fonts.
- `scripts/`: Contains scripts for data ingestion and other tasks.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
