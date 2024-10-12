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