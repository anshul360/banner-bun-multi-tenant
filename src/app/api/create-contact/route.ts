import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_PASSWORD);

export async function POST(request: Request) {
    const { email } = await request.json()
    try {
        resend.contacts.create({
            email,
            // firstName: 'Steve',
            // lastName: 'Wozniak',
            unsubscribed: false,
            audienceId: 'a7df2915-f269-49b9-bf1b-f2e65f2ad8b8',
        });
    } catch (e) {
        return Response.json({ success: false }, { status: 500 })
    }
    return Response.json({ success: true }, { status: 200 })
}