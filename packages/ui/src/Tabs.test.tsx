import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const renderTabs = () =>
  render(
    <Tabs defaultValue="one">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
      </TabsList>
      <TabsContent value="one">First panel</TabsContent>
      <TabsContent value="two">Second panel</TabsContent>
    </Tabs>,
  );

describe(TabsList, () => {
  it('shows the default tab panel', () => {
    renderTabs();

    expect(screen.getByText('First panel')).toBeTruthy();
    expect(screen.queryByText('Second panel')).toBeNull();
  });

  it('switches panels on tab click', async () => {
    const user = userEvent.setup();

    renderTabs();
    await user.click(screen.getByRole('tab', { name: 'Two' }));

    expect(screen.getByText('Second panel')).toBeTruthy();
    expect(screen.queryByText('First panel')).toBeNull();
  });

  it('moves the active tab with arrow keys', async () => {
    const user = userEvent.setup();

    renderTabs();
    await user.click(screen.getByRole('tab', { name: 'One' }));
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Two' }).getAttribute('aria-selected')).toBe('true');
  });

  it('shares the tab style from the list with its triggers', () => {
    render(
      <Tabs defaultValue="one">
        <TabsList tabStyle="lineBottom">
          <TabsTrigger value="one">One</TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    expect(screen.getByRole('tablist').className).toContain('border-b');
    expect(screen.getByRole('tab', { name: 'One' }).className).toContain('border-b-2');
  });

  it('shares the size from the list with its triggers', () => {
    render(
      <Tabs defaultValue="one">
        <TabsList size="lg">
          <TabsTrigger value="one">One</TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    expect(screen.getByRole('tab', { name: 'One' }).className).toContain('px-4');
  });
});
