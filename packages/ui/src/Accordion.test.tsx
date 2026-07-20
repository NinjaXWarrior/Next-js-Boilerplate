import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

const renderAccordion = () =>
  render(
    <Accordion collapsible type="single">
      <AccordionItem value="a">
        <AccordionTrigger>Section A</AccordionTrigger>
        <AccordionContent>Details A</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Section B</AccordionTrigger>
        <AccordionContent>Details B</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );

describe(AccordionItem, () => {
  it('hides all panels initially', () => {
    renderAccordion();

    expect(screen.queryByText('Details A')).toBeNull();
  });

  it('expands a section on trigger click', async () => {
    const user = userEvent.setup();

    renderAccordion();
    await user.click(screen.getByRole('button', { name: 'Section A' }));

    expect(screen.getByText('Details A')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Section A' }).getAttribute('aria-expanded')).toBe(
      'true',
    );
  });

  it('collapses an expanded section on second click', async () => {
    const user = userEvent.setup();

    renderAccordion();
    await user.click(screen.getByRole('button', { name: 'Section A' }));
    await user.click(screen.getByRole('button', { name: 'Section A' }));

    expect(screen.queryByText('Details A')).toBeNull();
  });

  it('shows one section at a time in single mode', async () => {
    const user = userEvent.setup();

    renderAccordion();
    await user.click(screen.getByRole('button', { name: 'Section A' }));
    await user.click(screen.getByRole('button', { name: 'Section B' }));

    expect(screen.queryByText('Details A')).toBeNull();
    expect(screen.getByText('Details B')).toBeTruthy();
  });

  it('applies the item style variants', () => {
    const { container } = render(
      <Accordion collapsible type="single">
        <AccordionItem accordionStyle="rounded" value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>Details A</AccordionContent>
        </AccordionItem>
        <AccordionItem accordionStyle="filled" value="b">
          <AccordionTrigger>Section B</AccordionTrigger>
          <AccordionContent>Details B</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(container.querySelector('.rounded-xl')).toBeTruthy();
    expect(container.querySelector('.bg-neutral-50')).toBeTruthy();
  });
});
