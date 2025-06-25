import type { FieldHook } from 'payload/types'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthors: FieldHook = async ({ data }) => {
  if (data?.authors && Array.isArray(data.authors)) {
    return data.authors.map((author: any) => {
      if (typeof author === 'string') {
        return author
      }
      return author.id
    })
  }
  return data?.authors
}
