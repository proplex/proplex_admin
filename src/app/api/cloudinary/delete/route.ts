import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const publicId = searchParams.get('publicId');

  if (!publicId) {
    return NextResponse.json(
      { error: 'publicId is required' },
      { status: 400 }
    );
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    return NextResponse.json(
      { error: 'Failed to delete file from Cloudinary' },
      { status: 500 }
    );
  }
}
