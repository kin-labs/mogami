import { Box, Flex, Stack, Tab, TabList, Tabs } from '@chakra-ui/react'
import { AdminClusterUiCluster } from '@mogami/admin/cluster/ui'
import React, { PropsWithChildren } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useAppEnv } from './app-env-provider'
import { AppHeader } from './app-header'

export function EnvDetailLayout({ children }: PropsWithChildren<any>) {
  const { env, tabs } = useAppEnv()
  const { url } = useRouteMatch()
  const defaultIndex = tabs.findIndex((item) => item.path === url) || 0
  return (
    <Stack direction="column" spacing={6}>
      {env.app && <AppHeader app={env.app} />}
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex justifyContent="space-between" alignItems="center">
          <Box maxW="32rem" fontSize="xl" as="h4">
            Environment: {env?.name}
          </Box>
          {env?.cluster && <AdminClusterUiCluster cluster={env?.cluster} />}
        </Flex>
      </Box>
      <Tabs colorScheme="teal" defaultIndex={defaultIndex}>
        <TabList>
          {tabs.map((tab) => (
            <Tab as={Link} key={tab.path} to={tab.path}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
      </Tabs>
      <Box>{children}</Box>
    </Stack>
  )
}
