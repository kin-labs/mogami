import { Box, Code, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Td, Text, useToast } from '@chakra-ui/react'
import { AdminAppUiForm, AdminAppUiUserModal, AdminAppUiUsers, AdminAppUiWallet } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import {
  AppUpdateInput,
  AppUserAddInput,
  AppUserUpdateRoleInput,
  useAppQuery,
  useAppUserAddMutation,
  useAppUserUpdateRoleMutation,
  useUpdateAppMutation,
} from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function AdminAppFeatureDetail() {
  const toast = useToast()
  const { appId } = useParams<{ appId: string }>()
  const [{ data, fetching }] = useAppQuery({ variables: { appId } })
  const [, updateAppMutation] = useUpdateAppMutation()
  const [, updateUserAddMutation] = useAppUserAddMutation()
  const [, updateRoleMutation] = useAppUserUpdateRoleMutation()

  const onSubmit = async (input: AppUpdateInput) => {
    const res = await updateAppMutation({ appId, input })
    if (res?.data?.updated) {
      toast({ status: 'success', title: 'App updated' })
    }
    return res?.data?.updated
  }

  const addRole = async ({ role, userId }: AppUserAddInput) => {
    await updateUserAddMutation({ appId, input: { role, userId } })
  }
  const updateRole = async ({ userId, role }: AppUserUpdateRoleInput) => {
    await updateRoleMutation({ appId, input: { role, userId } })
  }

  if (fetching) {
    return <AdminUiLoader />
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex justifyContent="space-between" alignItems="center">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated flex={'auto'}>
            {data?.item?.name}
          </Box>
          <code>App Index: {data?.item?.index}</code>
        </Flex>
      </Box>

      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        {data?.item?.envs?.map((env) => (
          <Box>
            <Text>Environment: {env?.name}</Text>
            {env?.domains?.map((domain) => (
              <Code colorScheme="teal">{domain?.hostname}</Code>
            ))}
          </Box>
        ))}
      </Box>

      <Tabs isLazy colorScheme="teal">
        <TabList>
          <Tab>Wallet</Tab>
          <Tab>Users</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{data?.item?.wallet && <AdminAppUiWallet wallet={data?.item?.wallet} />}</TabPanel>
          <TabPanel>
            <Stack direction="column" spacing={6}>
              <Box w="full">
                <AdminAppUiUsers updateRole={updateRole} users={data?.item?.users} />
              </Box>
              <Box>
                <AdminAppUiUserModal addRole={addRole} />
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel>
            <AdminAppUiForm app={data?.item} onSubmit={onSubmit} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
