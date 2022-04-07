import { Box, Stack, useToast } from '@chakra-ui/react'
import { AdminAppUiTable } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useAppsQuery, useDeleteAppMutation } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export default function AdminAppFeatureList() {
  const toast = useToast()
  const [{ data, fetching }, refresh] = useAppsQuery()
  const [, deleteApp] = useDeleteAppMutation()

  const handleDelete = async (appId: string) => {
    if (!window.confirm(`Are you sure?`)) return
    const res = await deleteApp({ appId })
    if (res.data?.deleted) {
      toast({
        title: 'App deleted',
        description: `App name: ${res.data.deleted.name} (${res.data.deleted.index})`,
      })
    }
    await refresh()
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          Apps
        </Box>
      </Box>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        {fetching && !data?.items?.length ? (
          <AdminUiLoader />
        ) : (
          <div>
            <AdminAppUiTable apps={data?.items} deleteApp={handleDelete} />
          </div>
        )}
      </Box>
    </Stack>
  )
}
