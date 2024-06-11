
const fetchEmails = async (sessionToken: string| undefined) => {

    //console.log("Access token to be sent", sessionToken)
    try {
        const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=10', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Accept': 'application/json'
            },
        });
        console.log("Response from gmail api", response)
        if (!response.ok) {
            throw new Error('Failed to fetch emails');
        }

        const emails = await response.json();
        

        return emails;
    } catch (error) {
        console.error('Error fetching emails:', error);
        throw error;
    }
};

export default fetchEmails;