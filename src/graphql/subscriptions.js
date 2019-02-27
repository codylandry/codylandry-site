// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateChannel = `subscription OnCreateChannel {
  onCreateChannel {
    id
    name
    members {
      items
      nextToken
    }
  }
}
`;
export const onUpdateChannel = `subscription OnUpdateChannel {
  onUpdateChannel {
    id
    name
    members {
      items
      nextToken
    }
  }
}
`;
export const onDeleteChannel = `subscription OnDeleteChannel {
  onDeleteChannel {
    id
    name
    members {
      items
      nextToken
    }
  }
}
`;
export const onCreateChannelMembership = `subscription OnCreateChannelMembership {
  onCreateChannelMembership {
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
export const onUpdateChannelMembership = `subscription OnUpdateChannelMembership {
  onUpdateChannelMembership {
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
export const onDeleteChannelMembership = `subscription OnDeleteChannelMembership {
  onDeleteChannelMembership {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateMessage = `subscription OnCreateMessage {
  onCreateMessage {
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
export const onUpdateMessage = `subscription OnUpdateMessage {
  onUpdateMessage {
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
export const onDeleteMessage = `subscription OnDeleteMessage {
  onDeleteMessage {
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
