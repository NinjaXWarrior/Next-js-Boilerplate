import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './Breadcrumb';

const renderBreadcrumb = () =>
  render(
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/home">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Profile</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>,
  );

describe(Breadcrumb, () => {
  it('renders a labeled navigation landmark', () => {
    renderBreadcrumb();

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeTruthy();
  });

  it('renders links with their href', () => {
    renderBreadcrumb();

    expect(screen.getByRole('link', { name: 'Home' }).getAttribute('href')).toBe('/home');
  });

  it('marks the current page with aria-current', () => {
    renderBreadcrumb();

    expect(screen.getByText('Profile').getAttribute('aria-current')).toBe('page');
  });

  it('renders the requested separator indicator', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/home">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator indicator="slash" />
        <BreadcrumbItem>
          <BreadcrumbPage>Profile</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>,
    );

    expect(screen.getByText('/').getAttribute('aria-hidden')).toBe('true');
  });
});
