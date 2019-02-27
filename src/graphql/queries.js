// eslint-disable
// this is an auto generated file. This will be overwritten

export const getChannel = `query GetChannel($id: ID!) {
  getChannel(id: $id) {
    id
    name
    members {
      items
      nextToken
    }
  }
}
`;
export const listChannels = `query ListChannels(
  $filter: ModelChannelFilterInput
  $limit: Int
  $nextToken: String
) {
  listChannels(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      members {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getChannelMembership = `query GetChannelMembership($id: ID!) {
  getChannelMembership(id: $id) {
    user {
      id
      username
      channels {
        nextToken
      }
      messages {
        nextToken
      }
    }
    channel {
      id
      name
      members {
        nextToken
      }
    }
  }
}
`;
export const listChannelMemberships = `query ListChannelMemberships(
  $filter: ModelChannelMembershipFilterInput
  $limit: Int
  $nextToken: String
) {
  listChannelMemberships(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      user {
        id
        username
      }
      channel {
        id
        name
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    channels {
      items
      nextToken
    }
    messages {
      items {
        id
        content
        timestamp
      }
      nextToken
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      channels {
        nextToken
      }
      messages {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getMessage = `query GetMessage($id: ID!) {
  getMessage(id: $id) {
    id
    content
    timestamp
    user {
      id
      username
      channels {
        nextToken
      }
      messages {
        nextToken
      }
    }
  }
}
`;
export const listMessages = `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      timestamp
      user {
        id
        username
      }
    }
    nextToken
  }
}
`;
