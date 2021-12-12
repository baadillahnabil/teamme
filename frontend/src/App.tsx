import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/300.css'
import {
  ChakraProvider,
  chakra,
  Box,
  Text,
  VStack,
  Grid,
  Heading,
  extendTheme,
} from '@chakra-ui/react'
import Counter from './donation/Counter'
import logo from './assets/images/logo_black.png'
import { useQuery, useSubscription } from 'urql'

export const App = () => {
  const totalDonationsQuery = `
    query Query {
      totalDonations
    }
  `
  const totalDonationsSubscription = `
    subscription Subscription {
      totalDonations
    }
  `

  const [res] = useSubscription(
    { query: totalDonationsSubscription },
    (perv, newTotal) => newTotal.totalDonations
  )
  const [{ data, fetching, error }] = useQuery({
    query: totalDonationsQuery,
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Aw, Snap!</p>

  const theme = extendTheme({
    fonts: {
      heading: 'Montserrat',
      body: 'Montserrat',
    },
  })

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bg="gray.100">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <chakra.img src={logo} maxW="80" />
            <Heading as="h1" size="xl">
              Let's do it!
            </Heading>
            <Text width="100%">
              Inspired by <a href="https://teamseas.org">#teamseas</a> and{' '}
              <a href="https://teamtrees.org">#teamtrees</a> by Mr. Beast but
              the donation goes to me! 🤪
            </Text>
            <Heading as="h2" size="4xl">
              <Counter from={0} to={res.data || data.totalDonations} />
            </Heading>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
