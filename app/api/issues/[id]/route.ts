import { issueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface DTO {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: DTO) {
  const body = await request.json();

  const validationResult = issueSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(validationResult.error.flatten().fieldErrors, {
      status: 400,
    });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(request: NextRequest, { params }: DTO) {
  console.log(request);

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 400 });
  }

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
