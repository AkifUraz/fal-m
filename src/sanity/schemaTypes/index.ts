import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import contactSubmission from './contactSubmission'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [post, blockContent, contactSubmission],
}
