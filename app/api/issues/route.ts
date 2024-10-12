import { issueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validationResult = issueSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(validationResult.error.flatten().fieldErrors, {
      status: 400,
    });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
