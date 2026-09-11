import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const name = body.name || 'Unknown';
    const email = body.email || '';
    const phone = body.phone || '';
    const eventType = body.eventType || 'Не визначено';
    
    // Prepare the client record matching our Tina CMS schema
    const clientData = {
      name,
      email,
      phone,
      booking_date: new Date().toISOString(),
      event_type: eventType,
      notes: 'Створено через форму Pre-booking',
    };

    // Create a safe ASCII filename
    const fileName = `client-${Date.now()}.json`;
    const fileContent = JSON.stringify(clientData, null, 2);

    const githubToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;
    const githubBranch = process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_BRANCH || 'main';

    if (githubToken && githubOwner && githubRepo) {
      // Push directly to GitHub (for production)
      const path = `clients/${fileName}`;
      const url = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${path}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'User-Agent': 'auto-school-mentor-app',
        },
        body: JSON.stringify({
          message: `Add client ${name} from pre-booking form`,
          content: Buffer.from(fileContent, 'utf-8').toString('base64'),
          branch: githubBranch,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('GitHub API error:', response.status, errorText);
        return NextResponse.json({ error: 'Failed to save to GitHub', details: errorText }, { status: response.status });
      }
    } else {
      console.warn('Missing GitHub configuration environment variables on server:', {
        hasToken: !!githubToken,
        hasOwner: !!githubOwner,
        hasRepo: !!githubRepo,
      });
      // Fallback for local development
      const fs = await import('fs/promises');
      const path = await import('path');
      
      // Ensure clients directory exists
      const clientsDir = path.join(process.cwd(), 'clients');
      try {
        await fs.access(clientsDir);
      } catch {
        await fs.mkdir(clientsDir);
      }
      
      const filePath = path.join(clientsDir, fileName);
      await fs.writeFile(filePath, fileContent);
      console.log(`Saved client locally to ${filePath}`);
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// GET endpoint to auto-cleanup invalid/corrupted filenames and list files
export async function GET() {
  try {
    const githubToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;
    const githubBranch = process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_BRANCH || 'main';

    if (!githubToken || !githubOwner || !githubRepo) {
      return NextResponse.json({ error: 'Missing GitHub configuration' }, { status: 500 });
    }

    const url = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/clients?ref=${githubBranch}`;
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'auto-school-mentor-app',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch clients from GitHub' }, { status: res.status });
    }

    const files = await res.json();
    const cleanedFiles: string[] = [];

    if (Array.isArray(files)) {
      for (const file of files) {
        // If filename contains non-ASCII characters (like Cyrillic causing Tina CMS error)
        if (/[^\x00-\x7F]/.test(file.name)) {
          const deleteUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${encodeURI(file.path)}`;
          const delRes = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${githubToken}`,
              'Accept': 'application/vnd.github+json',
              'Content-Type': 'application/json',
              'User-Agent': 'auto-school-mentor-app',
            },
            body: JSON.stringify({
              message: `Remove invalid client file ${file.name}`,
              sha: file.sha,
              branch: githubBranch,
            }),
          });
          if (delRes.ok) {
            cleanedFiles.push(file.name);
          }
        }
      }
    }

    return NextResponse.json({
      message: cleanedFiles.length > 0 
        ? `Успішно видалено пошкоджений файл: ${cleanedFiles.join(', ')}` 
        : 'Усі файли клієнтів коректні, пошкоджених файлів не знайдено.',
      cleanedFiles,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// DELETE endpoint to delete a client by file name
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get('file');

    if (!fileName) {
      return NextResponse.json({ error: 'Параметр file обовʼязковий' }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;
    const githubBranch = process.env.GITHUB_BRANCH || 'main';

    if (!githubToken || !githubOwner || !githubRepo) {
      return NextResponse.json({ error: 'Missing GitHub configuration' }, { status: 500 });
    }

    const fileUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/clients/${encodeURIComponent(fileName)}?ref=${githubBranch}`;
    const fileRes = await fetch(fileUrl, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'auto-school-mentor-app',
      },
    });

    if (!fileRes.ok) {
      return NextResponse.json({ error: 'Файл не знайдено в репозиторії' }, { status: 404 });
    }

    const fileData = await fileRes.json();
    const sha = fileData.sha;

    const deleteUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/clients/${encodeURIComponent(fileName)}`;
    const delRes = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'auto-school-mentor-app',
      },
      body: JSON.stringify({
        message: `Delete client ${fileName}`,
        sha,
        branch: githubBranch,
      }),
    });

    if (!delRes.ok) {
      return NextResponse.json({ error: 'Не вдалося видалити файл' }, { status: delRes.status });
    }

    return NextResponse.json({ success: true, message: `Файл ${fileName} успішно видалено` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
