import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VaultItem from '@/models/VaultItem';
import { getSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await dbConnect();

    const item = await VaultItem.findOne({
      _id: id,
      userId: session.userId,
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Vault item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ item }, { status: 200 });
  } catch (error) {
    console.error('Get vault item error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { encryptedData } = await request.json();

    if (!encryptedData) {
      return NextResponse.json(
        { error: 'Encrypted data is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const item = await VaultItem.findOneAndUpdate(
      { _id: id, userId: session.userId },
      { encryptedData },
      { new: true }
    );

    if (!item) {
      return NextResponse.json(
        { error: 'Vault item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Vault item updated successfully',
        item,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update vault item error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await dbConnect();

    const item = await VaultItem.findOneAndDelete({
      _id: id,
      userId: session.userId,
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Vault item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Vault item deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete vault item error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

