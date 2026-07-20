import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Base/ButtonGroup',
  component: ButtonGroup,
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outlined">Day</Button>
      <Button variant="outlined">Week</Button>
      <Button variant="outlined">Month</Button>
    </ButtonGroup>
  ),
};
