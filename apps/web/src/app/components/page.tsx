'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarGroup,
  Badge,
  BarChart,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  InlineAlert,
  Input,
  LineChart,
  Loader,
  Pagination,
  PieChart,
  ProgressBar,
  ProgressStep,
  Radio,
  Rating,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Stat,
  StickyAlert,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Title,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  VerificationInput,
} from '@repo/ui';
import { useState } from 'react';

const monthly = [
  { month: 'Jan', revenue: 74, expenses: 42 },
  { month: 'Feb', revenue: 58, expenses: 31 },
  { month: 'Mar', revenue: 66, expenses: 48 },
  { month: 'Apr', revenue: 51, expenses: 85 },
  { month: 'May', revenue: 72, expenses: 20 },
  { month: 'Jun', revenue: 87, expenses: 41 },
];

const shares = [
  { name: 'Starter', value: 45 },
  { name: 'Pro', value: 30 },
  { name: 'Team', value: 15 },
  { name: 'Enterprise', value: 10 },
];

const Section = (props: { children: React.ReactNode; title: string }) => (
  <section className="flex flex-col gap-4">
    <h2 className="border-b border-neutral-200 pb-2 text-h5 font-semibold text-neutral-900">
      {props.title}
    </h2>
    {props.children}
  </section>
);

const Row = (props: { children: React.ReactNode }) => (
  <div className="flex flex-wrap items-center gap-3">{props.children}</div>
);

export default function ComponentsPage() {
  const [page, setPage] = useState(4);
  const [rating, setRating] = useState(3.5);
  const [code, setCode] = useState('');
  const [tags, setTags] = useState(['React', 'Next.js', 'Tailwind']);
  const [banner, setBanner] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      {banner && (
        <StickyAlert
          onDismiss={() => {
            setBanner(false);
          }}
          variant="primary"
        >
          This page showcases every @repo/ui component imported from the Shipfaster design system.
        </StickyAlert>
      )}
      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-12">
        <Title
          actions={<Button size="sm">Primary action</Button>}
          size="lg"
          subtitle="Every component from packages/ui, rendered live in the app."
          title="Component showcase"
        />

        <Section title="Buttons">
          <Row>
            <Button>Filled</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="grayscale">Grayscale</Button>
            <Button disabled>Disabled</Button>
          </Row>
          <Row>
            <Button size="xs">XSmall</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">XLarge</Button>
            <Button size="xxl">XXLarge</Button>
          </Row>
          <Row>
            <ButtonGroup>
              <Button variant="outlined">Day</Button>
              <Button variant="outlined">Week</Button>
              <Button variant="outlined">Month</Button>
            </ButtonGroup>
          </Row>
        </Section>

        <Section title="Badges">
          <Row>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </Row>
          <Row>
            <Badge badgeStyle="filled" variant="primary">
              Filled
            </Badge>
            <Badge badgeStyle="accent" variant="primary">
              Accent
            </Badge>
            <Badge badgeStyle="outlined" variant="primary">
              Outlined
            </Badge>
            <Badge shape="rounded" variant="success">
              Rounded
            </Badge>
            <Badge size="lg" variant="warning">
              Large
            </Badge>
          </Row>
        </Section>

        <Section title="Chips">
          <Row>
            {tags.map((tag) => (
              <Chip
                key={tag}
                onRemove={() => {
                  setTags(tags.filter((t) => t !== tag));
                }}
              >
                {tag}
              </Chip>
            ))}
            <Chip selected>Selected</Chip>
            <Chip chipStyle="filled" color="success">
              Filled
            </Chip>
            <Chip disabled>Disabled</Chip>
          </Row>
        </Section>

        <Section title="Form controls">
          <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            <Input id="demo-email" label="Email (boxed)" placeholder="you@example.com" />
            <Input
              fieldStyle="outlined"
              id="demo-name"
              label="Name (outlined)"
              placeholder="Jane Doe"
            />
            <Input fieldStyle="lined" id="demo-role" label="Role (lined)" placeholder="Designer" />
            <Input
              error="Enter a valid email address"
              id="demo-error"
              label="With error"
              placeholder="you@example"
            />
          </div>
          <Row>
            <div className="w-56">
              <Select>
                <SelectTrigger id="demo-fruit">
                  <SelectValue placeholder="Pick a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="cherry">Cherry</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Checkbox defaultChecked id="demo-terms" label="Accept terms" />
            <Radio defaultChecked id="demo-m" label="Monthly" name="billing" value="monthly" />
            <Radio id="demo-y" label="Yearly" name="billing" value="yearly" />
            <Switch defaultChecked label="Notifications" />
          </Row>
          <div className="flex max-w-md flex-col gap-2">
            <p className="text-label-md font-medium text-neutral-700">Verification code</p>
            <VerificationInput onChange={setCode} value={code} />
          </div>
          <div className="max-w-md">
            <Slider defaultValue={40} label="Volume" />
          </div>
        </Section>

        <Section title="Alerts">
          <div className="flex max-w-2xl flex-col gap-3">
            <InlineAlert title="Heads up">A default neutral alert with a title.</InlineAlert>
            <InlineAlert variant="primary">An informational message.</InlineAlert>
            <InlineAlert alertStyle="outlined" variant="success">
              Your changes were saved.
            </InlineAlert>
            <InlineAlert alertStyle="filled" variant="warning">
              Storage is almost full.
            </InlineAlert>
            <InlineAlert variant="destructive">Something went wrong.</InlineAlert>
          </div>
        </Section>

        <Section title="Progress and feedback">
          <div className="flex max-w-md flex-col gap-3">
            <ProgressBar value={30} />
            <ProgressBar value={65} variant="success" />
            <ProgressBar size="lg" value={85} variant="warning" />
          </div>
          <ProgressStep current={1} steps={['Account', 'Billing', 'Confirm']} />
          <ProgressStep
            current={1}
            direction="vertical"
            indicator="dot"
            steps={['Ordered', 'Shipped', 'Delivered']}
          />
          <Row>
            <Loader size="sm" />
            <Loader size="md" />
            <Loader size="lg" />
            <Rating onChange={setRating} value={rating} />
            <Rating color="neutral" value={2.5} />
          </Row>
        </Section>

        <Section title="Navigation">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Library</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator indicator="slash" />
            <BreadcrumbItem>
              <BreadcrumbPage>Components</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">The default button-style tabs.</TabsContent>
            <TabsContent value="activity">Recent activity appears here.</TabsContent>
            <TabsContent value="settings">Settings appear here.</TabsContent>
          </Tabs>
          <Tabs defaultValue="overview">
            <TabsList tabStyle="lineBottom">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
          <Pagination onPageChange={setPage} page={page} pageCount={12} />
        </Section>

        <Section title="Overlays">
          <Row>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outlined">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete workspace</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. The workspace and its data will be removed.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="grayscale">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outlined">Open menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="grayscale">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>A neutral tooltip</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="grayscale">Or me</Button>
                </TooltipTrigger>
                <TooltipContent variant="primary">A primary tooltip</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Row>
          <Accordion className="max-w-2xl" collapsible type="single">
            <AccordionItem value="a">
              <AccordionTrigger>What is this library?</AccordionTrigger>
              <AccordionContent>
                A token-based component library imported from the Shipfaster UI Figma file.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>How is it styled?</AccordionTrigger>
              <AccordionContent>
                CSS custom properties wired through Tailwind v4 and class-variance-authority.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion className="max-w-2xl" collapsible type="single">
            <AccordionItem accordionStyle="rounded" value="a">
              <AccordionTrigger>Rounded accordion style</AccordionTrigger>
              <AccordionContent>Each item is a rounded bordered card.</AccordionContent>
            </AccordionItem>
            <AccordionItem accordionStyle="rounded" value="b">
              <AccordionTrigger>Another item</AccordionTrigger>
              <AccordionContent>With its own card.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        <Section title="Data display">
          <Row>
            <Avatar initials="NL" />
            <Avatar size="lg" src="https://i.pravatar.cc/96" />
            <Avatar initials="ON" status="online" />
            <Avatar initials="RD" shape="rounded" />
            <AvatarGroup moreCount={4}>
              <Avatar initials="AB" />
              <Avatar initials="CD" />
              <Avatar initials="EF" />
            </AvatarGroup>
          </Row>
          <div className="grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <Stat change="+12% from last month" label="Monthly revenue" trend="up" value="$42k" />
            </Card>
            <Card>
              <Stat change="-4% from last month" label="Churn" trend="down" value="2.1%" />
            </Card>
            <Card title="Card with title">
              <p className="text-sm text-neutral-600">Cards wrap any content.</p>
            </Card>
          </div>
        </Section>

        <Section title="Charts">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card title="Revenue vs expenses">
              <LineChart
                curved
                data={monthly}
                label="Revenue vs expenses"
                series={['revenue', 'expenses']}
                xKey="month"
              />
            </Card>
            <Card title="Monthly totals">
              <BarChart
                data={monthly}
                label="Monthly totals"
                series={['revenue', 'expenses']}
                xKey="month"
              />
            </Card>
            <Card title="Plan share">
              <PieChart data={shares} label="Plan share" />
            </Card>
            <Card title="Customers">
              <PieChart
                centerLabel="Customers"
                centerValue="99,999"
                data={shares}
                label="Customers by plan"
                type="donut"
              />
            </Card>
          </div>
        </Section>
      </main>
    </div>
  );
}
