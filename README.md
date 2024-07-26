# Swappington

Swappington is a Next.js-based application designed to allow users to remove and replace backgrounds in their photos. This project serves as a tutorial for building a complete web application with Next.js, including front-end components, back-end APIs, and database integration.

This project is meant to be a NextJS development guide & hands on learning opportunity. 

**[Follow along with the development via my blog](https://blog.zatrok.com/background-swapper-with-nextjs-part-i/)**

**Features**
- Photo Background Removal: Upload photos and replace their backgrounds with new ones.
- Dashboard Interface: A clean and intuitive dashboard for managing photo uploads.
- Database Integration: Utilizes Prisma ORM with a PostgreSQL database hosted on Neon.
- File Storage: Stores uploaded files on Cloudflare R2 for easy access and scalability.
- Authentication: Secures the application with Auth0 (to be integrated in later stages).

## Getting Started
**Prerequisites**

- [Node.js](https://nodejs.org/en) (LTS version recommended)
- [Yarn](https://yarnpkg.com/) (for package management)

**Installation**
Clone the repository:
```sh
git clone https://github.com/yourusername/swappington.git
cd swappington
```

**Install dependencies:**
```sh
yarn install
```

**Run the development server:**
```sh
yarn dev
```

Open your browser and visit http://localhost:3000 to see the application in action.

**Roadmap**

- **Phase 1**: Set up the basic Next.js project structure with a simple dashboard interface. **[Link to article](https://blog.zatrok.com/background-swapper-with-nextjs-part-i/)**
- **Phase 2**: Integrate Prisma and set up a PostgreSQL database on Neon. *Work in progress...*
- **Phase 3**: Implement file storage using Cloudflare R2. *Work in progress...*
- **Phase 4**: Add authentication with Auth0. *Work in progress...*
- **Phase 5**: Enhance the application with image processing capabilities for background removal. *Work in progress...*

**Contributing**

Contributions are welcome! Please fork the repository and submit a pull request.
License

This project is licensed under the MIT License. See the LICENSE file for details.
Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudflare R2](https://www.cloudflare.com/en-gb/developer-platform/r2/)
- [Prisma ORM](https://www.prisma.io/)
- [Neon PostgreSQL](https://neon.tech/)

**Contact**
For questions or suggestions, please open an issue in the GitHub repository or write me via ben@zatrok.com
