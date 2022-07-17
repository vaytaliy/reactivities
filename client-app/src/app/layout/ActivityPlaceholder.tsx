import React from 'react';
import { Item, Placeholder } from 'semantic-ui-react';

interface Props {
    inverted: boolean;
}

const ActivityPlaceholder = ({inverted} : Props) => {
    return (
        <Item>
            <Item.Content>
                <Placeholder inverted={inverted}>
                    <Placeholder.Header>
                        <Placeholder.Line length='long' />
                        <Placeholder.Line length='short' />
                    </Placeholder.Header>
                    <Placeholder.Paragraph/>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Item.Content>
        </Item>
    )
}

export default ActivityPlaceholder;

