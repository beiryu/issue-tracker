'use client';

import Link from 'next/link';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import {
  Text,
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
} from '@radix-ui/themes';

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex align={'center'} justify={'between'}>
          <Flex align={'center'} gap={'3'}>
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return null;

  if (status === 'unauthenticated')
    return <Link href="/api/auth/signin" className='nav-link'>Log in</Link>;

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Box>
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </Box>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { name: 'Dashboard', href: '/' },
    { name: 'Issues', href: '/issues/list' },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              'nav-link': true,
              '!text-zinc-900': link.href === currentPath,
            })}
            href={link.href}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
