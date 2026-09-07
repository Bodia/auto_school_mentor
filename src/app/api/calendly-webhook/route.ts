import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Calendly sends 'invitee.created' when a new booking is made
    if (body.event !== 'invitee.created') {
      return NextResponse.json({ message: 'Ignored' }, { status: 200 });
    }

    const payload = body.payload || {};
    const name = payload.name || 'Unknown';
    const email = payload.email || '';
    const phone = payload.text_reminder_number || '';
    
    // Prepare the client record matching our Tina CMS schema
    const clientData = {
      name,
      email,
      phone,
      booking_date: payload.created_at || new Date().toISOString(),
      event_type: 'Calendly Booking',
      notes: 'Автоматично імпортовано через Calendly Webhook',
    };

    // Create a safe filename
    const slug = name.toLowerCase().replace(/[^a-z0-9а-яієїґ]/gi, '-').replace(/-+/g, '-');
    const fileName = `${slug}-${Date.now()}.json`;
    const fileContent = JSON.stringify(clientData, null, 2);

    const githubToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;
    const githubBranch = process.env.GITHUB_BRANCH || 'main';

    if (githubToken && githubOwner && githubRepo) {
      // Push directly to GitHub (for production)
      const path = `clients/${fileName}`;
      const url = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${path}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add client ${name} from Calendly webhook`,
          content: Buffer.from(fileContent).toString('base64'),
          branch: githubBranch,
        }),
      });

      if (!response.ok) {
        console.error('GitHub API error:', await response.text());
        return NextResponse.json({ error: 'Failed to save to GitHub' }, { status: 500 });
      }
    } else {
      // Fallback for local development
      const fs = await import('fs/promises');
      const path = await import('path');
      const filePath = path.join(process.cwd(), 'clients', fileName);
      await fs.writeFile(filePath, fileContent);
      console.log(`Saved client locally to ${filePath}`);
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
