# Email Classifier

This project aims to enhance the email management experience by enabling users to connect to their Gmail accounts and filter out spam or unwanted emails from their inboxes. The project leverages OpenAI's API to classify emails into the following categories:

- Important: Emails that are personal or work-related and require immediate attention.
- Promotions: Emails related to sales, discounts, and marketing campaigns.
- Social: Emails from social networks, friends, and family.
- Marketing: Emails related to marketing, newsletters, and notifications.
- Spam: Unwanted or unsolicited emails.
- General: Emails that do not fit into any of the above categories.

### Features

- Gmail Integration: Seamlessly connect to your Gmail account using auth.js
- AI-Powered Classification: Utilize OpenAI's API to categorize emails.
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

Open http://localhost:3000 with your browser to see the result.
Open http://localhost:3000/login manually to login, as the middleware is not set yet.

### Learn More

- [Gmail API](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/list)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub Repository](https://github.com/vercel/next.js/)

### Preview

![EmailClassifier](https://lh3.googleusercontent.com/d/119ANkZTEPtf4HEeFz5hDuyzRE_JweLoC)
