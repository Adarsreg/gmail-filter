# Mail Filter

This project aims to enhance the email management experience by enabling users to connect to their Gmail accounts and filter out spam or unwanted emails from their inboxes. The project leverages Gemini's API to classify emails into the following categories:

- Important: Emails that are personal or work-related and require immediate attention.
- Promotions: Emails related to sales, discounts, and marketing campaigns.
- Social: Emails from social networks, friends, and family.
- Marketing: Emails related to marketing, newsletters, and notifications.
- Spam: Unwanted or unsolicited emails.
- General: Emails that do not fit into any of the above categories.

### Features

- Gmail Integration: Seamlessly connect to your Gmail account using auth.js
- AI-Powered Classification: Utilize Gemini's API to categorize emails.
- Effortless Email Management: Easily remove unwanted emails after classification.

### Steps to Getting the Code Running

The email classifier is built using Next.js. To get your development environment up and running, follow these steps:

### Prerequisites

Ensure you have Node.js and npm installed. If not, you can download and install them from [Node.js](https://nodejs.org/).

### Installation

Clone the repository:

```
git clone https://github.com/Adarsreg/email-classifier.git
cd email-classifier
```

Install the dependencies:

```
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Important Notes before getting started (mainly env related)

- UPSTASH_REDIS_URL and UPSTASH_REDIS_TOKEN are to be retrived from your newly created database at [upstash.com](https://upstash.com/) .This ensures that the account details are safely stored in your \_own\* database.
- Setup [Google OAUTH consent from ](https://console.cloud.google.com/) and retrieve GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the .env for gmail api interaction. Also turn on API and Services for gmail.
- Also set NEXT_PUBLIC_API_BASE_URL as http://localhost:3000.
- Lastly, add NEXTAUTH_SECRET in the .env. The NEXTAUTH_SECRET is a secret key used by NextAuth.js for encryption, ensuring that tokens, cookies, and other data are securely transmitted.
- You can raise a PR (describing the issue) to either main or test1 branch. The test1 branch will eventually be merged with the main.

### Running the Development Server

Start the development server:

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

- Open http://localhost:3000 with your browser to see the result. It prints "Hello world".

- Open http://localhost:3000/login manually to login, as the middleware is not set yet.

### Preview

![Login](https://lh3.googleusercontent.com/d/1c9xCKd6vLJIYkAnfndcqg-acWQjlxo0a)
![GmailFilter](https://lh3.googleusercontent.com/d/1iWzaOEzbXjw4z-36GzV5zY7_yq_PFAlo)

### Learn More

- [Gmail API](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/list)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub Repository](https://github.com/vercel/next.js/)
