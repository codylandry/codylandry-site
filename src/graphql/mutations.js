// eslint-disable
// this is an auto generated file. This will be overwritten

export const createChannel = `mutation CreateChannel($input: CreateChannelInput!) {
  createChannel(input: $input) {
    id
    name
    members {
      items
      nextToken
    }
  }
}
`;
export const updateChannel = `mutation UpdateChannel($input: UpdateChannelInput!) {
  updateChannel(input: $input) {
    id
    name
    members {
      items
      nextToken
    }
  }
}
`;
export const deleteChannel = `mutation DeleteChannel($input: DeleteChannelInput!) {
  deleteChannel(input: $input) {
    id
    name
    members {
      items
      nextToken
    }
  }
}
`;
export const createChannelMembership = `mutation CreateChannelMembership($input: CreateChannelMembershipInput!) {
  createChannelMembership(input: $input) {
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
export const updateChannelMembership = `mutation UpdateChannelMembership($input: UpdateChannelMembershipInput!) {
  updateChannelMembership(input: $input) {
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
export const deleteChannelMembership = `mutation DeleteChannelMembership($input: DeleteChannelMembershipInput!) {
  deleteChannelMembership(input: $input) {
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createMessage = `mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
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
export const updateMessage = `mutation UpdateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
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
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
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
