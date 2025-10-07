import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VaultItem from '@/models/VaultItem';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const items = await VaultItem.find({ userId: session.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error('Get vault items error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { encryptedData } = await request.json();

    if (!encryptedData) {
      return NextResponse.json(
        { error: 'Encrypted data is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const item = await VaultItem.create({
      userId: session.userId,
      encryptedData,
    });

    return NextResponse.json(
      { 
        message: 'Vault item created successfully',
        item,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create vault item error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

