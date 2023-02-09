# Api Bankme

### Software prerequisites

Install the below tools/packages

| Serial No   | Software           | Version   | Installation site |
| :---------: | :----------------: | :-------: | :---------------- |
| 1           | Node.js            | >= 16.17.0  | [Install NodeJS](https://nodejs.org/en/download/) |
| 2           | yarn               | >= 1.22.0 | [Install Yarn](https://yarnpkg.com/)      |
| 3           | Prisma            | >= 2.29.1 | [Install Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres) |


#### System setup
1. Clone the repo with `git clone [REPO_URL]` command
2. Switch to the project's root directory in terminal
3. Install the dependencies by running `yarn`

#### Commands
1. `yarn migration` - Run the migration
2. `yarn studio` - Run the prisma studio
3. `yarn dev` - Run the app in development mode	
4. `yarn seed` - Seed the table admin
5. `yarn erd` - Generate the ERD diagram
#### Setup
1. Create a `.env` file in the root directory of the project
2. Copy the content of `.env.example` file and paste it in the `.env` file
3. Update the environment variables in the `.env` file


