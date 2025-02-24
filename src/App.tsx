import {
  AppShell,
  Burger,
  Group,
  MantineProvider,
  NavLink,
  Text,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { Outlet, useLocation } from "react-router";

function App() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  return (
    <MantineProvider>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Text>
              Effectively Rendering Large Datasets - BoulderJS 02/26/25
            </Text>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <NavLink href="/" label="Intro" active={location.pathname === "/"} />
          <NavLink
            href="problematic"
            label="Problematic example"
            active={location.pathname === "/problematic"}
          />
          <NavLink
            href="improved"
            label="Improved example"
            active={location.pathname === "/improved"}
          />
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
