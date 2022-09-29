import { Container } from '@chakra-ui/react'
import React from 'react'
import CardAccount from './components/CardAccount'
import CardBottom from './components/CardBottom'
import CardHead from './components/CardHead'
import CardOption from './components/CardOption'

const Card = () => {
    return (
        <>
            <Container border='1px solid' bg='#fff'>
                <CardOption />
                <CardHead />
                <CardBottom />
                <CardAccount />
            </Container>
        </>
    )
}

export default Card
