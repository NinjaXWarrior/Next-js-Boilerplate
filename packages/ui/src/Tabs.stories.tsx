import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Base/Tabs',
  component: Tabs,
  args: {
    defaultValue: 'account',
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Update your account details here.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  ),
};
