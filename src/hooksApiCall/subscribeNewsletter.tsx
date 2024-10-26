export interface NewsletterInputTypes {
    email: string
    name: string
}
export const subscribeUserToNewsletter = (data: NewsletterInputTypes) => {
     fetch('/api/mailer_subscribe', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            ...data
     })
    })
};