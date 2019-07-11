import React from 'react'
import { Card, Grid, Placeholder } from 'semantic-ui-react'

const LoadingCard = () => {
    return (
            <Grid.Column>
            <Card fluid>
                <Placeholder>
                    <Placeholder.Image square></Placeholder.Image>
                </Placeholder>
                <Card.Content>
                    <Placeholder>
                        <Placeholder.Header>
                            <Placeholder.Line length='very short' />
                            <Placeholder.Line length='medium' />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line length='short' />
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Card.Content>
            </Card>
            </Grid.Column>
    )
}

export default LoadingCard  