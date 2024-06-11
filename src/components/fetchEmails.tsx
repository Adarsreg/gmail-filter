
const fetchEmails = async (sessionToken: string| undefined) => {

    console.log("Access token to be sent", sessionToken)
    try {
        const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Accept': 'application/json'
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch emails');
        }

        const emails = await response.json();
        console.log(emails)

        return emails;
    } catch (error) {
        console.error('Error fetching emails:', error);
        throw error;
    }
};

export default fetchEmails;