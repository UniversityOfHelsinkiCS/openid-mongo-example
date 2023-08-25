import React from 'react'
import { Box, Paper, Button, Typography } from '@mui/material'
import { useTranslation, Trans } from 'react-i18next'

import useCounter from '../../hooks/useCounter'
import {
  useIncrementMutation,
  useDecrementMutation,
} from '../../hooks/useCounterMutation'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    p: '5% 10%',
    mt: 5,
  },
  button: {
    mt: 2,
    ml: 1,
  },
}

const Buttons = () => {
  const { t } = useTranslation()

  const incrementMutation = useIncrementMutation()
  const decrementMutation = useDecrementMutation()

  return (
    <Box sx={styles.container}>
      <Button
        sx={styles.button}
        variant="contained"
        onClick={() => incrementMutation.mutate()}
      >
        {t('counter:increment')}
      </Button>

      <Button
        sx={styles.button}
        variant="contained"
        onClick={() => decrementMutation.mutate()}
      >
        {t('counter:decrement')}
      </Button>
    </Box>
  )
}

const Counter = () => {
  useTranslation()

  const { counter, isLoading } = useCounter()

  if (isLoading) return <Typography>Loading...</Typography>

  return (
    <Box sx={styles.container}>
      <Paper sx={styles.paper} variant="outlined">
        <Typography variant="h4">
          <Trans
            i18nKey="counter:currentValue"
            values={{ currentValue: counter?.value }}
          />
        </Typography>
        <Buttons />
      </Paper>
    </Box>
  )
}

export default Counter
