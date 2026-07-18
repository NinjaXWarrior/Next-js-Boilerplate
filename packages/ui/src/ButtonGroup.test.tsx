import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';

describe(ButtonGroup, () => {
  it('renders its children in a group', () => {
    render(
      <ButtonGroup>
        <Button variant="outlined">Day</Button>
        <Button variant="outlined">Week</Button>
      </ButtonGroup>,
    );

    expect(screen.getByRole('group')).toBeTruthy();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});
